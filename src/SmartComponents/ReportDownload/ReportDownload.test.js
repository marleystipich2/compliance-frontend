import { fireEvent, render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import usePDFExport from './hooks/usePDFExport';
import ReportDownload from './ReportDownload';

jest.mock('@apollo/client');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ policy_id: '1' }), // eslint-disable-line
  useLocation: jest.fn(),
  useHistory: jest.fn(() => ({})),
}));
jest.mock('Utilities/Dispatcher');
jest.mock('./hooks/usePDFExport');

describe('ReportDownload', function () {
  const exportFunMock = jest.fn(() => Promise.resolve([]));
  const useExportFuncMock = jest.fn(() => exportFunMock);
  it('expect to render without error', () => {
    usePDFExport.mockImplementation(useExportFuncMock);
    useQuery.mockImplementation(() => ({
      data: {
        profile: {
          name: 'Test Profile',
        },
      },
      error: undefined,
      loading: undefined,
    }));
    render(<ReportDownload />);

    expect(useExportFuncMock).toHaveBeenCalledWith(
      {
        compliantSystems: false,
        nonCompliantSystems: true,
        topTenFailedRules: true,
        unsupportedSystems: true,
        userNotes: undefined,
      },
      { name: 'Test Profile' }
    );

    const compliantSystemsCheckBox = screen.getByText('Compliant systems');
    expect(compliantSystemsCheckBox).toBeDefined();
    fireEvent.click(compliantSystemsCheckBox);

    const exportButton = screen.getByText('Export report');
    expect(exportButton).toBeDefined();
    fireEvent.click(exportButton);

    expect(exportFunMock).toHaveBeenCalled();
  });
});
