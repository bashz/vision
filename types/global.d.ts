export type ArrayOfTwoNumbers = [number, number];
export type ArrayOfTwoOrMoreNumbers = [...ArrayOfTwoNumbers, ...number[]];
export type Transformation<T> = (t: T) => T;
export type NumericTransformation = Transformation<number>
export type NumericFactoryOneParam = (arg: number, chain?: NumericFactory) => NumericTransformation;
export type NumericFactoryTwoParam = (arg1: number, arg2: number, chain?: NumericFactory) => NumericTransformation;
export type NumericFactory = NumericFactoryOneParam | NumericFactoryTwoParam;
