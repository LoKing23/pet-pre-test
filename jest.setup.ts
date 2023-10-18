// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

jest.mock('react', () => {
    const originalModule = jest.requireActual('react');
    const testCache = <T extends Function>(func: T) => func;

    return {
        ...originalModule,
        cache: testCache,
    }
})

jest.mock('next/navigation');