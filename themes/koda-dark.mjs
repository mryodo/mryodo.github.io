// koda.nvim "dark" variant as a Shiki theme.
// Derived from:
//   - lua/koda/palette/dark.lua        (colors)
//   - lua/koda/groups/syntax.lua        (syntax groups)
//   - lua/koda/groups/treesitter.lua    (token → group mapping)
// Diff backgrounds use koda.utils.blend(color, bg, 0.2).

const dark = {
  name: 'koda-dark',
  type: 'dark',
  fg: '#b0b0b0',
  bg: '#101010',
  colors: {
    'editor.background': '#101010',
    'editor.foreground': '#b0b0b0',
  },
  tokenColors: [
    // ---------- comments ----------
    {
      scope: [
        'comment',
        'comment.block',
        'comment.line',
        'comment.documentation',
        'punctuation.definition.comment',
        'string.quoted.docstring',
      ],
      settings: { foreground: '#50585d' },
    },
    // ---------- constants / numbers / booleans / macros ----------
    {
      scope: [
        'constant',
        'constant.language',
        'constant.character',
        'constant.numeric',
        'constant.numeric.integer',
        'constant.numeric.float',
        'constant.other',
        'constant.language.boolean',
        'constant.language.null',
        'support.constant',
        'entity.name.constant',
        'entity.name.macro',
        'support.macro',
        'variable.other.constant',
        'punctuation.definition.keyword',
      ],
      settings: { foreground: '#d9ba73' },
    },
    // this / self / super
    {
      scope: ['variable.language', 'variable.language.this'],
      settings: { foreground: '#d9ba73' },
    },
    // string escapes → Special (fg)
    {
      scope: [
        'constant.character.escape',
        'constant.character.escape.js',
        'string.escape',
        'escape',
      ],
      settings: { foreground: '#b0b0b0' },
    },
    // ---------- strings & characters ----------
    {
      scope: [
        'string',
        'string.quoted.double',
        'string.quoted.single',
        'string.quoted.triple',
        'string.quoted.other',
        'string.quoted.template',
        'string.template',
        'string.regexp',
        'string.other',
        'string.unquoted',
        'markup.raw',
        'markup.raw.block',
        'markup.inline.raw',
      ],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: ['character', 'constant.character'],
      settings: { foreground: '#ffffff' },
    },
    // ---------- keywords / storage / types / operators / tags ----------
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.control.flow',
        'keyword.control.conditional',
        'keyword.control.loop',
        'keyword.control.import',
        'keyword.control.catch',
        'keyword.control.exception',
        'keyword.control.directive',
        'keyword.coroutine',
        'keyword.declaration',
        'keyword.other',
        'keyword.other.package',
        'storage',
        'storage.type',
        'storage.type.function',
        'storage.type.class',
        'storage.type.interface',
        'storage.type.enum',
        'storage.type.namespace',
        'storage.modifier',
        'storage.modifier.async',
        'entity.name.tag',
        'entity.other.attribute-name',
        'punctuation.definition.tag',
      ],
      settings: { foreground: '#777777' },
    },
    {
      scope: [
        'keyword.operator',
        'keyword.operator.expression',
        'keyword.operator.arithmetic',
        'keyword.operator.assignment',
        'keyword.operator.comparison',
        'keyword.operator.logical',
        'keyword.operator.relational',
        'keyword.operator.type',
        'operator',
        'operator.keyword',
        'operator.arithmetic',
        'operator.assignment',
        'operator.comparison',
        'operator.logical',
      ],
      settings: { foreground: '#777777' },
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.type.class',
        'entity.name.type.type',
        'entity.name.type.alias',
        'entity.name.class',
        'entity.name.struct',
        'entity.name.interface',
        'entity.name.enum',
        'entity.name.tag.custom',
        'support.type',
        'support.type.class',
        'support.class',
        'support.type.primitive',
        'punctuation.definition.generic',
      ],
      settings: { foreground: '#777777' },
    },
    // delimiters & separators → Delimiter (type)
    {
      scope: [
        'punctuation.separator',
        'punctuation.separator.comma',
        'punctuation.separator.parameter',
        'punctuation.definition.separator',
        'punctuation.delimiter',
      ],
      settings: { foreground: '#777777' },
    },
    // ---------- functions ----------
    {
      scope: [
        'entity.name.function',
        'entity.name.function.method',
        'entity.name.function.call',
        'entity.name.method',
        'variable.function',
        'variable.other.function',
        'support.function',
        'support.function.builtin',
      ],
      settings: { foreground: '#ffffff', fontStyle: 'bold' },
    },
    // function macros → Macro (const)
    {
      scope: ['entity.name.function.macro'],
      settings: { foreground: '#d9ba73' },
    },
    // ---------- variables / members / props / modules ----------
    {
      scope: [
        'variable',
        'variable.other',
        'variable.other.readwrite',
        'variable.other.object',
        'variable.other.anon',
        'variable.parameter',
        'variable.parameter.function',
        'variable.parameter.rest',
        'variable.other.member',
        'variable.other.property',
        'variable.other.object.property',
        'variable.other.description',
        'variable.other.posix',
        'entity.name.variable',
        'support.variable',
      ],
      settings: { foreground: '#b0b0b0' },
    },
    {
      scope: [
        'entity.name.namespace',
        'entity.name.module',
        'entity.name.type.module',
        'support.namespace',
      ],
      settings: { foreground: '#b0b0b0' },
    },
    // ---------- punctuation / brackets ----------
    {
      scope: [
        'punctuation.bracket',
        'punctuation.bracket.round',
        'punctuation.bracket.curly',
        'punctuation.bracket.square',
        'punctuation.bracket.angle',
        'punctuation.section',
        'punctuation.definition.bracket',
        'punctuation.definition.bracket.curly',
      ],
      settings: { foreground: '#b0b0b0' },
    },
    // preprocessor → PreProc (fg)
    {
      scope: ['meta.preprocessor', 'keyword.control.preprocessor', 'preprocessor'],
      settings: { foreground: '#b0b0b0' },
    },
    // ---------- markup ----------
    {
      scope: ['markup.heading', 'markup.heading.setext'],
      settings: { foreground: '#ffffff', fontStyle: 'bold' },
    },
    {
      scope: ['markup.bold', 'markup.strong'],
      settings: { fontStyle: 'bold' },
    },
    {
      scope: ['markup.italic', 'markup.emphasis'],
      settings: { fontStyle: 'italic' },
    },
    {
      scope: ['markup.quote', 'markup.other'],
      settings: { foreground: '#50585d' },
    },
    {
      scope: ['markup.list', 'markup.list.bullet'],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: ['markup.link', 'meta.link'],
      settings: { foreground: '#ffffff', fontStyle: 'underline' },
    },
    {
      scope: ['markup.link.url', 'string.other.link', 'markup.underline.link'],
      settings: { foreground: '#8ebeec', fontStyle: 'underline' },
    },
    // ---------- diff ----------
    {
      scope: ['markup.inserted', 'punctuation.definition.inserted'],
      settings: { foreground: '#86cd82' },
    },
    {
      scope: ['markup.deleted', 'punctuation.definition.deleted'],
      settings: { foreground: '#ff7676' },
    },
    {
      scope: ['markup.changed', 'punctuation.definition.changed'],
      settings: { foreground: '#d9ba73' },
    },
    {
      scope: ['meta.diff.header', 'meta.diff.range', 'meta.diff.index'],
      settings: { foreground: '#8ebeec' },
    },
    // ---------- misc ----------
    {
      scope: ['invalid', 'invalid.illegal', 'invalid.deprecated'],
      settings: { foreground: '#ff7676' },
    },
  ],
}

export default dark