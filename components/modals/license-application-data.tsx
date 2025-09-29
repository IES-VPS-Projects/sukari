import { useApplication } from '@/hooks/use-applications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, User, FileText, Building, CreditCard } from 'lucide-react';
import EntityData from '@/app/portal/ksb/today/components/entity-data';

const LicenseApplicationData = ({ licenseApplicationId }: { licenseApplicationId: string }) => {
  const { data: applicationResponse, isLoading, error } = useApplication(licenseApplicationId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load application data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!applicationResponse?.data) {
    return (
      <Alert>
        <AlertDescription>
          No application data found.
        </AlertDescription>
      </Alert>
    );
  }

  const application = applicationResponse.data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">License Application Details</h1>
        <Badge className={getStatusColor(application.status)}>
          {application.status.replace('_', ' ')}
        </Badge>
      </div>


      <div className="grid gap-6">
        {/* Application Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Application Overview
            </CardTitle>
          </CardHeader>
          <EntityData entityId={application.entityId} />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Entity ID</label>
                <p className="text-sm">{application.entityId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Application ID</label>
                <p className="text-sm">{application.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">License</label>
                <p className="text-sm font-medium">{application.license.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Submitted</label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(application.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Payment Status</label>
                <Badge className={getPaymentStatusColor(application.paymentStatus)}>
                  {application.paymentStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              License Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">License Name</label>
                <p className="text-sm font-medium">{application.license.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-sm">{application.license.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="text-sm">{application.license.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Issuing Authority</label>
                <p className="text-sm">{application.license.issuingAuthority}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Cost</label>
                <p className="text-sm font-medium">{application.license.cost}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Processing Time</label>
                <p className="text-sm">{application.license.processingTime}</p>
              </div>
            </div>
            {application.license.description && (
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-700 mt-1">{application.license.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Application Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            {application.applicationData && Object.keys(application.applicationData).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(application.applicationData).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start">
                    <label className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="text-sm text-right max-w-xs">
                      {typeof value === 'object' ? (
                        <pre className="text-xs bg-gray-50 p-2 rounded">
                          {JSON.stringify(value, null, 2)}
                        </pre>
                      ) : (
                        <span>{String(value)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No application data available</p>
            )}
          </CardContent>
        </Card>

        {/* Payment Information */}
        {application.paymentReference && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Reference</label>
                  <p className="text-sm font-mono">{application.paymentReference}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <Badge className={getPaymentStatusColor(application.paymentStatus)}>
                    {application.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Review Information */}
        {(application.reviewedAt || application.assignedTo || application.notes) && (
          <Card>
            <CardHeader>
              <CardTitle>Review Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.reviewedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Reviewed At</label>
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(application.reviewedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              {application.assignedTo && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned To</label>
                  <p className="text-sm">{application.assignedTo}</p>
                </div>
              )}
              {application.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Notes</label>
                  <p className="text-sm text-gray-700 mt-1">{application.notes}</p>
                </div>
              )}
              {application.rejectionReason && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Rejection Reason</label>
                  <p className="text-sm text-red-700 mt-1">{application.rejectionReason}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LicenseApplicationData;