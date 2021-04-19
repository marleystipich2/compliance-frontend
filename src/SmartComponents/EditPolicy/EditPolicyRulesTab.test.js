import { useQuery } from '@apollo/client';
import EditPolicyRulesTab from './EditPolicyRulesTab.js';

jest.mock('@apollo/client');

describe('EditPolicyRulesTab', () => {
    useQuery.mockImplementation(() => ({
        data: {
            benchmarks: {
                edges: [{
                    id: '1',
                    osMajorVersion: '7',
                    rules: []
                }]
            }
        }, error: undefined, loading: undefined
    }));

    it('expect to render without error', async () => {
        const wrapper = shallow(
            <EditPolicyRulesTab
                handleSelect={ () => {} }
                policy={ { policy: { profiles: [] } } }
                selectedRuleRefIds={ [] }
                osMinorVersionCounts={ {} }
            />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
