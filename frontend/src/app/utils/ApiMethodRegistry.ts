import { toConstantCase, type ConstantCaseType } from '@/app/utils/toConstantCase'

export type ApiMethod = (...args: any[]) => any

export type ApiMethodEntry<
  Name extends string = string,
  Method extends ApiMethod = ApiMethod,
> = readonly [name: Name, method: Method]

// *************************
// Type helpers
// *************************

type TupleIndex<Tuple extends readonly unknown[]> = Extract<keyof Tuple, `${number}`>

type NumberFromIndex<Index extends string> = Index extends `${infer Number extends number}`
  ? Number
  : never

type MethodFromEntry<Entry> = Entry extends readonly [string, infer Method extends ApiMethod]
  ? Method
  : never

// *************************
// Registry result types
// *************************

export type ApiOpcodes<Entries extends readonly ApiMethodEntry[]> = {
  readonly [Index in TupleIndex<Entries> as ConstantCaseType<
    Entries[Index][0]
  >]: NumberFromIndex<Index>
}

export type ApiMethods<Entries extends readonly ApiMethodEntry[]> = {
  readonly [Entry in Entries[number] as Entry[0]]: Entry[1]
}

export type ApiMethodsArray<Entries extends readonly ApiMethodEntry[]> = {
  readonly [Index in keyof Entries]: MethodFromEntry<Entries[Index]>
}

export interface BuiltApiMethodRegistry<Entries extends readonly ApiMethodEntry[]> {
  readonly OPCODE: ApiOpcodes<Entries>
  readonly methods: ApiMethods<Entries>
  readonly methodsArray: ApiMethodsArray<Entries>
}

export class ApiMethodRegistry<Entries extends readonly ApiMethodEntry[] = readonly []> {
  constructor(private readonly entries: Entries = [] as unknown as Entries) {}

  // Method order matters: the array index is used as the opcode.
  set<Name extends string, Method extends ApiMethod>(
    name: Name,
    method: Method
  ): ApiMethodRegistry<[...Entries, readonly [name: Name, method: Method]]> {
    const nextEntries = [...this.entries, [name, method] as const] as [
      ...Entries,
      readonly [name: Name, method: Method],
    ]

    return new ApiMethodRegistry(nextEntries)
  }

  build(): BuiltApiMethodRegistry<Entries> {
    const seenMethodNames = new Set<string>()
    const seenOpcodeNames = new Set<string>()

    const methodEntries: Array<readonly [string, ApiMethod]> = []
    const opcodeEntries: Array<readonly [string, number]> = []
    const methodsArray: ApiMethod[] = []

    for (const [name, method] of this.entries) {
      const opcode = methodsArray.length
      const opcodeName = toConstantCase(name)

      if (seenMethodNames.has(name)) {
        throw new Error(`Duplicate API method: ${name}`)
      }

      if (seenOpcodeNames.has(opcodeName)) {
        throw new Error(`Duplicate API opcode: ${opcodeName}`)
      }

      seenMethodNames.add(name)
      seenOpcodeNames.add(opcodeName)

      methodEntries.push([name, method])
      opcodeEntries.push([opcodeName, opcode])
      methodsArray.push(method)
    }

    return {
      OPCODE: Object.fromEntries(opcodeEntries) as ApiOpcodes<Entries>,
      methods: Object.fromEntries(methodEntries) as ApiMethods<Entries>,
      methodsArray: methodsArray as unknown as ApiMethodsArray<Entries>,
    }
  }
}
