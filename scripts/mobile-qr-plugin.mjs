import os from 'node:os'

/**
 * Vite 插件：开发（或预览）服务器启动后，在终端打印局域网地址和二维码，
 * 手机连同一个 Wi-Fi 后扫码即可打开本站（配合 vite.config.js 里的 server.host / preview.host）。
 *
 * 实现取舍：
 * - qrcode-terminal 用半角块字符渲染，语义是"浅色模块 = 终端前景色、深色模块 = 终端背景色"，
 *   所以默认深色终端（Windows 命令行默认如此）扫码方向正确；浅色终端下二维码会反色，此时直接用打印出的网址。
 * - 用动态 import + try/catch 加载依赖，避免依赖缺失时整个开发服务器起不来；先加载再统一输出，
 *   否则异步 import 会让 Vite 自己的提示插进二维码中间。
 * - 中文输出由 Node 直接写控制台（Windows 下走 WriteConsoleW），不受 chcp 代码页影响。
 */

const RULE = '─'.repeat(58)

let qrTerminalPromise

/** 懒加载并缓存 qrcode-terminal（加载失败返回 null，只提示不报错） */
function loadQrTerminal() {
  qrTerminalPromise ??= import('qrcode-terminal')
    .then((mod) => mod.default ?? mod)
    .catch(() => null)
  return qrTerminalPromise
}

/** 内网网段优先级：数值越小越优先，169.254.x.x 是系统自动分配地址，通常不能互访 */
function priorityOf(ip) {
  if (ip.startsWith('192.168.')) return 0
  if (ip.startsWith('10.')) return 1
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return 2
  if (ip.startsWith('169.254.')) return 9
  return 3
}

/** 虚拟网卡 / 隧道网卡：Hyper-V、WSL、VMware、VirtualBox、Tailscale 等，地址通常连不到手机 */
const VIRTUAL_ADAPTER = /virtual|vmware|vbox|virtualbox|hyper-?v|vethernet|wsl|docker|loopback|npcap|tailscale|zerotier/i

/** 列出本机可用于局域网访问的 IPv4 地址，按"最可能是手机能访问到的"排序 */
function lanIPv4List() {
  const list = []
  for (const [name, addrs] of Object.entries(os.networkInterfaces())) {
    for (const addr of addrs ?? []) {
      const isIPv4 = addr.family === 'IPv4' || addr.family === 4
      if (!isIPv4 || addr.internal) continue
      // 虚拟网卡排在后面，但仍作为备选列出（例如确实要靠 Tailscale 组网时）
      const penalty = VIRTUAL_ADAPTER.test(name) ? 4 : 0
      list.push({ name, address: addr.address, priority: priorityOf(addr.address) + penalty })
    }
  }
  return list.sort((a, b) => a.priority - b.priority)
}

/** 把 vite 的 base 规整成 URL 路径（本项目 base 为 './'，即部署在根路径） */
function normalizeBase(base) {
  if (!base || base === './' || base === '.') return '/'
  const path = base.startsWith('/') ? base : `/${base}`
  return path.endsWith('/') ? path : `${path}/`
}

async function printMobileQr(server, kind) {
  // 先把内容准备好再输出，保证整块提示与二维码之间不会被其它日志插入
  const qrTerminal = await loadQrTerminal()

  const address = server.httpServer?.address?.()
  if (!address || typeof address === 'string') return

  const lanList = lanIPv4List().filter((item) => item.priority !== 9)

  console.log('')
  if (lanList.length === 0) {
    console.log('  [手机访问] 未检测到局域网 IP（可能未连接 Wi-Fi / 网线），手机暂时无法访问。')
    console.log('')
    return
  }

  // 服务器只监听回环地址时，手机虽然能看到二维码但连不上，直接给出原因
  if (address.address === '127.0.0.1' || address.address === '::1') {
    console.log('  [手机访问] 当前只监听本机地址，手机无法访问。')
    console.log(`  请改用：npm run ${kind === 'preview' ? 'preview' : 'dev'} -- --host`)
    console.log('')
    return
  }

  const url = `http://${lanList[0].address}:${address.port}${normalizeBase(server.config.base)}`

  console.log(`  ${RULE}`)
  console.log('  手机访问：手机与电脑连同一个 Wi-Fi，用相机 / 微信扫下方二维码打开')
  console.log(`  ${url}`)
  console.log('')

  if (qrTerminal) {
    qrTerminal.generate(url, { small: true })
  } else {
    console.log('  （未安装 qrcode-terminal，无法显示二维码：请执行 npm install）')
    console.log('')
  }

  console.log('  手机打不开时：确认 Windows 防火墙允许 Node.js 访问"专用网络"，')
  console.log('  并确认电脑与手机在同一网段（公司网络 / 访客 Wi-Fi 常会隔离设备）。')
  if (lanList.length > 1) {
    // 多网卡（含虚拟机 / 隧道）时给出备选地址，上面打印的不通可以换一个试
    const others = lanList.slice(1).map((item) => `${item.address}:${address.port} (${item.name})`)
    console.log(`  其它可用地址：${others.join('、')}`)
  }
  console.log(`  ${RULE}`)
  console.log('')
}

/**
 * @returns {import('vite').Plugin}
 */
export default function mobileQrPlugin() {
  function attach(server, kind) {
    const originalPrintUrls = server.printUrls?.bind(server)
    server.printUrls = () => {
      originalPrintUrls?.()
      void printMobileQr(server, kind)
    }
    // 兜底：极端情况下拿不到 printUrls 时，监听成功后再打印
    if (!originalPrintUrls) {
      server.httpServer?.once('listening', () => void printMobileQr(server, kind))
    }
    // 提前把依赖加载好，避免上面的异步加载把提示挪到其它日志后面
    void loadQrTerminal()
  }

  return {
    name: 'python-speedrun:mobile-qr',
    apply: 'serve',
    configureServer: (server) => attach(server, 'dev'),
    configurePreviewServer: (server) => attach(server, 'preview'),
  }
}
