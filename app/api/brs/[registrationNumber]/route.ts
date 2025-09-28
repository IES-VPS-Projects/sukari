import { NextRequest, NextResponse } from 'next/server';

// BRS API endpoint for company verification
export async function GET(
  request: NextRequest,
  { params }: { params: { registrationNumber: string } }
) {
  try {
    const { registrationNumber } = params;

    // Validate registration number format (should be like SB-20241112-987)
    const registrationRegex = /^[A-Z]{2}-\d{8}-\d{3}$/;
    if (!registrationRegex.test(registrationNumber)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid registration number format. Expected format: XX-YYYYMMDD-XXX',
          error: 'INVALID_FORMAT'
        },
        { status: 400 }
      );
    }

    console.log(`Fetching BRS data for registration number: ${registrationNumber}`);

    // For now, we'll simulate the BRS API call with the actual data structure
    // In a real implementation, this would call the actual BRS service
    const mockBRSData = {
      id: `cmfqrg2nd00001fuq3qp8ida8`,
      search_number: registrationNumber,
      registration_number: "PVT-123456",
      legal_name: "TechWave Solutions Ltd",
      company_type: "Limited",
      status: "Active",
      country: "Kenya",
      address: "Tech Park, Nanyuki Road, Nairobi",
      industry: "Information Technology",
      tax_id: "TIN-987654321",
      registration_date: "20/04/2015",
      phone: "2.54712E+11",
      email: "info@techwave.co.ke",
      state: "Nairobi",
      authorized_shared_capital: "KES 50,000",
      result_text: "Verified: Registered Kenyan company with valid registration number and active status.",
      result_code: "OK-200",
      verify_business: "Verified",
      fiduciary_name: "Grace Mwangi",
      fiduciary_type: "Individual",
      fiduciary_address: "11 Violet Ave, Nairobi",
      fiduciary_registration_number: "FID-001122",
      fiduciary_status: "Active",
      bo1_name: "Amit Patel",
      bo1_shareholdings: "40%",
      bo1_address: "Kilimani, Nairobi",
      bo1_gender: "Male",
      bo1_nationality: "Indian",
      bo1_registration_number: "BO-1001",
      bo1_shareholder_type: "Beneficiary",
      bo1_phone_number: "2547001001",
      bo2_name: "Sofia Kimani",
      bo2_shareholdings: "25%",
      bo2_address: "Upper Hill, Nairobi",
      bo2_gender: "Female",
      bo2_nationality: "Kenyan",
      bo2_registration_number: "BO-1002",
      bo2_shareholder_type: "Beneficiary",
      bo2_phone_number: "2547001002",
      dir1_name: "David Ochieng",
      dir1_shareholdings: "20%",
      dir1_id_number: "ID-22334455",
      dir1_address: "Kileleshwa, Nairobi",
      dir1_occupation: "CEO",
      dir1_gender: "Male",
      dir1_nationality: "Kenyan",
      dir1_date_of_birth: "12/08/1978",
      dir1_id_type: "NID",
      dir1_phone_number: "2547003001",
      dir2_name: "Lina Njoroge",
      dir2_shareholdings: "15%",
      dir2_id_number: "ID-99887766",
      dir2_address: "Muthaiga, Nairobi",
      dir2_occupation: "Director",
      dir2_gender: "Female",
      dir2_nationality: "Kenyan",
      dir2_date_of_birth: "22/03/1982",
      dir2_id_type: "NID",
      dir2_phone_number: "2547003002",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      data: mockBRSData,
      message: 'Company verification successful'
    });

  } catch (error) {
    console.error('BRS verification error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Company verification failed. Please try again.',
        error: 'VERIFICATION_FAILED'
      },
      { status: 500 }
    );
  }
}
