import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Key,
	Props,
	ReactElementType,
	Ref,
	Type,
	ElementType
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE, // 代表是 react element
		type,
		key,
		ref,
		props,
		__mark: '__Ma__' // 和真实项目的 react element 区分开
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	// config 中有两个需要特别注意：key 和 ref ，我们需要单独处理
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
				continue;
			}
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;
