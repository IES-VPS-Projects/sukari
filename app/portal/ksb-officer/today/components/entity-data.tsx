import React from 'react';
import { useEntity } from '@/hooks/use-entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, Mail, Phone, MapPin, Calendar, User, FileText } from 'lucide-react';

interface EntityDataProps {
  entityId: string;
}

const EntityData: React.FC<EntityDataProps> = ({ entityId }) => {
  const { data: entityResponse, isLoading, error } = useEntity(entityId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load entity data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!entityResponse?.data) {
    return (
      <Alert>
        <AlertDescription>
          No entity data found for the provided ID.
        </AlertDescription>
      </Alert>
    );
  }

  const entity = entityResponse.data;
  const brs = entity.businessId;
  const user = entity.user;

  return (
    <div className="space-y-6">
      {/* Entity Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {brs?.legal_name || entity.companyName || entity.userType}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {brs?.legal_name && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Company Name:</span>
                  <span className="text-sm">{brs.legal_name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
               
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm">{entity.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Phone:</span>
                <span className="text-sm">{entity.phoneNumber}</span>
              </div>
              {entity.website && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Website:</span>
                  <a 
                    href={entity.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {entity.website}
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Type:</span>
                <Badge variant="secondary">{entity.userType}</Badge>
              </div>
              {entity.status && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={entity.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {entity.status}
                  </Badge>
                </div>
              )}
              {entity.establishmentDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Established:</span>
                  <span className="text-sm">
                    {new Date(entity.establishmentDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      {(brs || entity.registrationNumber || entity.taxId || entity.industry) && (
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brs?.registration_number && (
                <div>
                  <span className="text-sm font-medium">Registration Number:</span>
                  <p className="text-sm text-muted-foreground">{brs.registration_number}</p>
                </div>
              )}
              {brs?.tax_id && (
                <div>
                  <span className="text-sm font-medium">Tax ID:</span>
                  <p className="text-sm text-muted-foreground">{brs.tax_id}</p>
                </div>
              )}
              {brs?.company_type && (
                <div>
                  <span className="text-sm font-medium">Company Type:</span>
                  <p className="text-sm text-muted-foreground">{brs.company_type}</p>
                </div>
              )}
              {brs?.status && (
                <div>
                  <span className="text-sm font-medium">BRS Status:</span>
                  <p className="text-sm text-muted-foreground">{brs.status}</p>
                </div>
              )}
              {entity.registrationNumber && (
                <div>
                  <span className="text-sm font-medium">Registration Number:</span>
                  <p className="text-sm text-muted-foreground">{entity.registrationNumber}</p>
                </div>
              )}
              {entity.taxId && (
                <div>
                  <span className="text-sm font-medium">Tax ID:</span>
                  <p className="text-sm text-muted-foreground">{entity.taxId}</p>
                </div>
              )}
              {entity.industry && (
                <div>
                  <span className="text-sm font-medium">Industry:</span>
                  <p className="text-sm text-muted-foreground">{entity.industry}</p>
                </div>
              )}
              {entity.businessType && (
                <div>
                  <span className="text-sm font-medium">Business Type:</span>
                  <p className="text-sm text-muted-foreground">{entity.businessType}</p>
                </div>
              )}
              {entity.numberOfEmployees && (
                <div>
                  <span className="text-sm font-medium">Number of Employees:</span>
                  <p className="text-sm text-muted-foreground">{entity.numberOfEmployees}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Address Information */}
      {(entity.address || entity.postalAddress || entity.county) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {entity.address && (
                <div>
                  <span className="text-sm font-medium">Address:</span>
                  <p className="text-sm text-muted-foreground">{entity.address}</p>
                </div>
              )}
              {entity.postalAddress && (
                <div>
                  <span className="text-sm font-medium">Postal Address:</span>
                  <p className="text-sm text-muted-foreground">{entity.postalAddress}</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entity.county && (
                  <div>
                    <span className="text-sm font-medium">County:</span>
                    <p className="text-sm text-muted-foreground">{entity.county}</p>
                  </div>
                )}
                {entity.subCounty && (
                  <div>
                    <span className="text-sm font-medium">Sub County:</span>
                    <p className="text-sm text-muted-foreground">{entity.subCounty}</p>
                  </div>
                )}
                {entity.location && (
                  <div>
                    <span className="text-sm font-medium">Location:</span>
                    <p className="text-sm text-muted-foreground">{entity.location}</p>
                  </div>
                )}
                {entity.ward && (
                  <div>
                    <span className="text-sm font-medium">Ward:</span>
                    <p className="text-sm text-muted-foreground">{entity.ward}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Information */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Associated User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Email:</span>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              {user?.role && (
                <div>
                  <span className="text-sm font-medium">Role:</span>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              )}
              {user?.employeeId && (
                <div>
                  <span className="text-sm font-medium">Employee ID:</span>
                  <p className="text-sm text-muted-foreground">{user.employeeId}</p>
                </div>
              )}
              {user?.designation && (
                <div>
                  <span className="text-sm font-medium">Designation:</span>
                  <p className="text-sm text-muted-foreground">{user.designation}</p>
                </div>
              )}
              {typeof user?.isActive === 'boolean' && (
                <div>
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={user.isActive ? 'default' : 'secondary'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              )}
              {user?.isKSBUser && (
                <div>
                  <Badge variant="default">KSB User</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Directors */}
      {Array.isArray(entity.directors) && entity.directors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Directors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entity.directors.map((d) => (
                <div key={d.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div><span className="font-medium">Name:</span> {d.name}</div>
                  <div><span className="font-medium">ID:</span> {d.idNumber}</div>
                  <div><span className="font-medium">Email:</span> {d.email || '—'}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EntityData;