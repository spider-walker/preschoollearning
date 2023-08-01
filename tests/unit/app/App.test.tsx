import { describe, it,vi } from 'vitest'
import { render } from '@testing-library/react';
import {For} from '../../../src/pages/For';
import * as ms from '../../../src/pages/For';
vi.mock('');

describe('For', () => {
	const items = [
		{ id: 1, name: 'item 1' },
		{ id: 2, name: 'item 2' },
		{ id: 3, name: 'item 3' },
	];
	afterEach(() => {
		vi.restoreAllMocks()
	  })
	it('renders without crashing', () => {
		const { baseElement } = render(<For 
		items={items}
		onTabClick={vi.fn()}
		/>);
		expect(baseElement).toBeDefined();


	});

	it('should get the latest message with a spy', () => {
		const spy = vi.spyOn(ms, 'getLatest')
		expect(spy.getMockName()).toEqual('getLatest')
	
		expect(ms.getLatest()).toEqual(
			items[items.length - 1],
		)
	
		expect(spy).toHaveBeenCalledTimes(1)
	 
		expect(ms.getLatest()).toEqual('access-restricted')
	
		expect(spy).toHaveBeenCalledTimes(2)
	  })
	
	  it('should get with a mock', () => {
		const mock = vi.fn().mockImplementation(ms.getLatest)
	
		expect(mock()).toEqual(items[items.length - 1])
		expect(mock).toHaveBeenCalledTimes(1)
	
		mock.mockImplementationOnce(() => 'access-restricted')
		expect(mock()).toEqual('access-restricted')
	
		expect(mock).toHaveBeenCalledTimes(2)
	
		expect(mock()).toEqual(items[items.length - 1])
		expect(mock).toHaveBeenCalledTimes(3)
	  })
});