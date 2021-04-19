import { useQuery } from '@apollo/client';
jest.mock('@apollo/client');

import { EditPolicyRules } from './EditPolicyRules.js';

describe('EditPolicyRules', () => {
    const defaultProps = {
        change: jest.fn()
    };
    const data = {
        profile: {
            refId: 'refID-test', name: 'test profile', rules: [{ refId: 'xccdfrefid' }]
        },
        benchmark: {
            rules: [{ refId: 'xccdfrefid' }]
        }
    };

    it('expect to render without error', () => {
        useQuery.mockImplementation(() => ({ data, error: undefined, loading: undefined }));
        const component = shallow(
            <EditPolicyRules { ...defaultProps } />
        );
        expect(toJson(component)).toMatchSnapshot();
    });

    it('expect to render with error on error', () => {
        useQuery.mockImplementation(() => ({ data: undefined, error: true, loading: undefined }));
        const component = shallow(
            <EditPolicyRules { ...defaultProps } />
        );
        expect(toJson(component)).toMatchSnapshot();
    });

    it('expect to render without error on loading', () => {
        useQuery.mockImplementation(() => ({ data: undefined, error: undefined, loading: true }));
        const component = shallow(
            <EditPolicyRules { ...defaultProps } />
        );
        expect(toJson(component)).toMatchSnapshot();
    });

    it('expect to render without error', () => {
        useQuery.mockImplementation(() => ({ data, error: undefined, loading: undefined }));
        const component = shallow(
            <EditPolicyRules { ...defaultProps } selectedRuleRefIds={ ['xccdfrefid'] } />
        );
        expect(toJson(component)).toMatchSnapshot();
    });
});
