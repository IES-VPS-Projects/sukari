import { useApplication } from '@/hooks/use-applications';
import { useEntity } from '@/hooks/use-entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, User, FileText, Building, CreditCard } from 'lucide-react';
import EntityData from '@/app/portal/ksb/today/components/entity-data';
import { Button } from '@/components/ui/button';

interface LicenseApplicationDataProps {
  licenseApplicationId: string
  conditions?: any
}

const LicenseApplicationData = ({ licenseApplicationId, conditions }: LicenseApplicationDataProps) => {
  const { data: applicationResponse, isLoading, error } = useApplication(licenseApplicationId);
  const application = applicationResponse?.data;
  const { data: entityResponse } = useEntity(application?.entityId || '');

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

  const entity = entityResponse?.data;
  const brs = entity?.businessId;
  const directors = Array.isArray(entity?.directors) ? entity?.directors : [];

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
        <Card className='border-none'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Application Overview
            </CardTitle>
          </CardHeader>
          <EntityData entityId={application.entityId} />

        
          <CardContent className="space-y-4">
            {/* Step Conditions */}
            {(() => {
              if (conditions) {
                const cond = Array.isArray(conditions) ? (conditions[0] || {}) : conditions
                const buttons = [
                  cond?.onComplete && { label: cond.onComplete, variant: 'default' },
                  cond?.onReject && { label: cond.onReject, variant: 'destructive' },
                  cond?.onTimeout && { label: cond.onTimeout, variant: 'secondary' },
                ].filter(Boolean) as Array<{ label: string; variant: 'default' | 'secondary' | 'destructive' }>
                if (buttons.length === 0) return null
                return (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Step Conditions</label>
                    <div className="flex flex-wrap gap-2">
                      {buttons.map((btn, i) => (
                        <Button key={i} variant={btn.variant} size="sm">
                          {btn.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )
              }
              if (Array.isArray(application.license.applicationSteps) && application.license.applicationSteps.length > 0) {
                return (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Step Conditions</label>
                    <div className="space-y-2">
                      {application.license.applicationSteps.map((step: any, idx: number) => {
                        const stepConditions = step?.conditions || {};
                        const buttons = [
                          stepConditions.onComplete && { label: stepConditions.onComplete, variant: 'default' },
                          stepConditions.onReject && { label: stepConditions.onReject, variant: 'destructive' },
                          stepConditions.onTimeout && { label: stepConditions.onTimeout, variant: 'secondary' },
                        ].filter(Boolean) as Array<{ label: string; variant: 'default' | 'secondary' | 'destructive' }>;
                        if (buttons.length === 0) return null;
                        return (
                          <div key={idx} className="flex flex-wrap gap-2">
                            {buttons.map((btn, i) => (
                              <Button key={i} variant={btn.variant} size="sm">
                                {btn.label}
                              </Button>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              }
              return null
            })()}
            {/* Business Summary (from entity) */}
            {entity && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <p className="text-sm font-medium">{brs?.legal_name || entity.companyName || '—'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Registration No.</label>
                  <p className="text-sm">{brs?.registration_number || entity.registrationNumber || '—'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tax ID</label>
                  <p className="text-sm">{brs?.tax_id || entity.taxId || '—'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Directors</label>
                  <p className="text-sm">{directors.length}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Email</label>
                  <p className="text-sm">{entity.email || brs?.email || '—'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Phone</label>
                  <p className="text-sm">{entity.phoneNumber || brs?.phone || '—'}</p>
                </div>
              </div>
            )}
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