/**
 * 轻量语法高亮：Python / Java / JSON / 终端。
 * 只做教学展示，不追求完整词法分析，避免引入额外依赖。
 */

const PY_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif',
  'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
  'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield', 'match',
  'case',
])

const PY_BUILTINS = new Set([
  'print', 'len', 'range', 'str', 'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple', 'type',
  'isinstance', 'enumerate', 'zip', 'sorted', 'sum', 'min', 'max', 'abs', 'map', 'filter', 'open',
  'super', 'object', 'Exception', 'ValueError', 'KeyError', 'TypeError', 'RuntimeError',
  'StopIteration', 'TimeoutError', 'any', 'all', 'repr', 'input', 'eval', 'getattr', 'hasattr',
  'callable', 'classmethod', 'staticmethod', 'property', 'round', 'format', 'next', 'iter', 'bytes',
])

const JAVA_KEYWORDS = new Set([
  'abstract', 'boolean', 'break', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default',
  'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'if', 'implements',
  'import', 'instanceof', 'int', 'interface', 'long', 'new', 'package', 'private', 'protected',
  'public', 'record', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this',
  'throw', 'throws', 'try', 'var', 'void', 'volatile', 'while', 'true', 'false', 'null', 'List',
  'Map', 'Set', 'String', 'Integer', 'var',
])

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function wrap(cls, text) {
  return `<span class="${cls}">${escapeHtml(text)}</span>`
}

/** Python 高亮 */
export function highlightPython(src) {
  const re = new RegExp(
    [
      '(#[^\\n]*)', // 1 注释
      '([rbfu]{0,2}(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'))', // 2 字符串
      '(@[A-Za-z_][\\w.]*)', // 3 装饰器
      '(\\b\\d+\\.?\\d*\\b)', // 4 数字
      '(\\b[A-Za-z_]\\w*\\b)', // 5 标识符
    ].join('|'),
    'g',
  )
  let out = ''
  let last = 0
  let m
  while ((m = re.exec(src))) {
    out += escapeHtml(src.slice(last, m.index))
    last = m.index + m[0].length
    if (m[1]) out += wrap('tok-com', m[1])
    else if (m[2]) out += wrap('tok-str', m[2])
    else if (m[3]) out += wrap('tok-dec', m[3])
    else if (m[4]) out += wrap('tok-num', m[4])
    else {
      const word = m[5]
      const rest = src.slice(last)
      if (PY_KEYWORDS.has(word)) out += wrap('tok-kw', word)
      else if (word === 'self' || word === 'cls') out += wrap('tok-self', word)
      else if (PY_BUILTINS.has(word)) out += wrap('tok-bi', word)
      else if (/^\s*\(/.test(rest)) out += wrap('tok-fn', word)
      else out += escapeHtml(word)
    }
  }
  out += escapeHtml(src.slice(last))
  return out
}

/** Java 高亮 */
export function highlightJava(src) {
  const re = new RegExp(
    [
      '(//[^\\n]*)', // 1 行注释
      '("""[\\s\\S]*?"""|"(?:\\\\.|[^"\\\\\\n])*")', // 2 字符串（含文本块）
      '(@[A-Za-z_][\\w.]*)', // 3 注解
      '(\\b\\d+\\.?\\d*\\b)', // 4 数字
      '(\\b[A-Za-z_]\\w*\\b)', // 5 标识符
    ].join('|'),
    'g',
  )
  let out = ''
  let last = 0
  let m
  while ((m = re.exec(src))) {
    out += escapeHtml(src.slice(last, m.index))
    last = m.index + m[0].length
    if (m[1]) out += wrap('tok-com', m[1])
    else if (m[2]) out += wrap('tok-str', m[2])
    else if (m[3]) out += wrap('tok-dec', m[3])
    else if (m[4]) out += wrap('tok-num', m[4])
    else {
      const word = m[5]
      if (JAVA_KEYWORDS.has(word)) out += wrap('tok-kw', word)
      else if (/^[A-Z]/.test(word)) out += wrap('tok-fn', word)
      else if (/^\s*\(/.test(src.slice(last))) out += wrap('tok-bi', word)
      else out += escapeHtml(word)
    }
  }
  out += escapeHtml(src.slice(last))
  return out
}

/** JSON 高亮 */
export function highlightJson(src) {
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|(\b-?\d+\.?\d*\b)|(\btrue\b|\bfalse\b|\bnull\b)/g
  let out = ''
  let last = 0
  let m
  while ((m = re.exec(src))) {
    out += escapeHtml(src.slice(last, m.index))
    last = m.index + m[0].length
    if (m[1]) {
      out += wrap(m[2] ? 'tok-bi' : 'tok-str', m[1])
      if (m[2]) out += escapeHtml(m[2])
    } else if (m[3]) out += wrap('tok-num', m[3])
    else out += wrap('tok-kw', m[0])
  }
  out += escapeHtml(src.slice(last))
  return out
}

/** 终端 / 命令行输出：识别注释、命令与提示符 */
export function highlightTerminal(src) {
  return src
    .split('\n')
    .map((line) => {
      if (/^\s*#/.test(line)) return wrap('tok-com', line)
      if (/^\s*(pip|python|uvicorn|curl|git|npm|mkdir|source|where|which|deactivate|Set-)/.test(line)) {
        return wrap('tok-bi', line)
      }
      return escapeHtml(line)
    })
    .join('\n')
}

export function highlight(code, lang = 'python') {
  const source = String(code ?? '')
  switch (lang) {
    case 'java':
      return highlightJava(source)
    case 'json':
      return highlightJson(source)
    case 'bash':
    case 'terminal':
    case 'text':
      return highlightTerminal(source)
    default:
      return highlightPython(source)
  }
}
