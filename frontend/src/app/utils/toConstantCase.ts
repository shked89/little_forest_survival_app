type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type IsLetter<Char extends string> = Lowercase<Char> extends Uppercase<Char> ? false : true

type CharKind<Char extends string> = Char extends Digit
  ? 'digit'
  : Char extends '_'
    ? 'underscore'
    : IsLetter<Char> extends true
      ? Char extends Lowercase<Char>
        ? 'lower'
        : 'upper'
      : 'other'

type NeedsUnderscore<Previous extends string, Current extends string> = Previous extends 'lower'
  ? Current extends 'upper' | 'digit'
    ? true
    : false
  : Previous extends 'upper'
    ? Current extends 'digit'
      ? true
      : false
    : Previous extends 'digit'
      ? Current extends 'upper'
        ? true
        : false
      : false

export type ConstantCaseType<
  Value extends string,
  Previous extends string = 'underscore',
  Result extends string = '',
> = Value extends `${infer Char}${infer Rest}`
  ? CharKind<Char> extends infer Current extends string
    ? Current extends 'underscore'
      ? ConstantCaseType<Rest, 'underscore', Result extends `${string}_` ? Result : `${Result}_`>
      : ConstantCaseType<
          Rest,
          Current,
          `${Result}${NeedsUnderscore<Previous, Current> extends true ? '_' : ''}${Uppercase<Char>}`
        >
    : never
  : Result

export function toConstantCase<const Value extends string>(value: Value): ConstantCaseType<Value> {
  const result = value
    // moveUnit -> move_Unit
    .replace(/([a-z])([A-Z])/g, '$1_$2')

    // unit13 -> unit_13
    .replace(/([A-Za-z])(\d)/g, '$1_$2')

    // 13Unit -> 13_Unit
    // 2d -> 2d
    .replace(/(\d)([A-Z])/g, '$1_$2')

    // foo___bar -> foo_bar
    .replace(/_+/g, '_')

    // __foo__ -> foo
    .replace(/^_+|_+$/g, '')

    .toUpperCase()

  return result as ConstantCaseType<Value>
}
