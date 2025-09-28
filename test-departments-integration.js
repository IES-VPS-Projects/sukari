// Test script to verify Department API integration
const BASE_URL = 'http://localhost:5005'; // Backend server (from config)

// Test data for creating a department
const testDepartmentData = {
  name: "Test Department",
  description: "This is a test department for integration testing",
  departmentCode: "TEST-DEPT-001",
  maxOfficers: 5,
  headOfDepartmentId: null
};

// Test data for updating a department
const updateDepartmentData = {
  name: "Updated Test Department",
  description: "This is an updated test department",
  maxOfficers: 10
};

async function testDepartmentsAPI() {
  console.log('🧪 Starting Department API Integration Tests...\n');

  try {
    // Test 1: Create a new department
    console.log('1️⃣ Testing POST /api/ksb/departments (Create Department)');
    const createResponse = await fetch(`${BASE_URL}/api/ksb/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testDepartmentData),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('❌ Create Department Failed:', errorText);
      return;
    }

    const createdDepartment = await createResponse.json();
    console.log('✅ Department created successfully:', createdDepartment);
    
    const departmentId = createdDepartment.data?.id;
    if (!departmentId) {
      console.error('❌ No department ID returned from create response');
      return;
    }

    // Test 2: Get all departments
    console.log('\n2️⃣ Testing GET /api/ksb/departments (Get All Departments)');
    const getAllResponse = await fetch(`${BASE_URL}/api/ksb/departments`);
    
    if (!getAllResponse.ok) {
      const errorText = await getAllResponse.text();
      console.error('❌ Get All Departments Failed:', errorText);
      return;
    }

    const allDepartments = await getAllResponse.json();
    console.log('✅ Retrieved all departments:', allDepartments);

    // Test 3: Get specific department
    console.log('\n3️⃣ Testing GET /api/ksb/departments/[id] (Get Specific Department)');
    const getOneResponse = await fetch(`${BASE_URL}/api/ksb/departments/${departmentId}`);
    
    if (!getOneResponse.ok) {
      const errorText = await getOneResponse.text();
      console.error('❌ Get Specific Department Failed:', errorText);
      return;
    }

    const specificDepartment = await getOneResponse.json();
    console.log('✅ Retrieved specific department:', specificDepartment);

    // Test 4: Update department
    console.log('\n4️⃣ Testing PUT /api/ksb/departments/[id] (Update Department)');
    const updateResponse = await fetch(`${BASE_URL}/api/ksb/departments/${departmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateDepartmentData),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('❌ Update Department Failed:', errorText);
      return;
    }

    const updatedDepartment = await updateResponse.json();
    console.log('✅ Department updated successfully:', updatedDepartment);

    // Test 5: Delete department
    console.log('\n5️⃣ Testing DELETE /api/ksb/departments/[id] (Delete Department)');
    const deleteResponse = await fetch(`${BASE_URL}/api/ksb/departments/${departmentId}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error('❌ Delete Department Failed:', errorText);
      return;
    }

    const deleteResult = await deleteResponse.json();
    console.log('✅ Department deleted successfully:', deleteResult);

    console.log('\n🎉 All Department API tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Test validation scenarios
async function testValidationScenarios() {
  console.log('\n🔍 Testing validation scenarios...\n');

  try {
    // Test 1: Missing required fields
    console.log('1️⃣ Testing missing required fields');
    const invalidData = {
      description: "Missing name and departmentCode"
    };

    const response = await fetch(`${BASE_URL}/api/ksb/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    });

    if (response.status === 400) {
      const errorResponse = await response.json();
      console.log('✅ Validation working correctly:', errorResponse);
    } else {
      console.log('❌ Expected 400 status for missing required fields');
    }

    // Test 2: Empty name
    console.log('\n2️⃣ Testing empty name');
    const emptyNameData = {
      name: "",
      departmentCode: "TEST-001"
    };

    const emptyNameResponse = await fetch(`${BASE_URL}/api/ksb/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emptyNameData),
    });

    if (emptyNameResponse.status === 400) {
      const errorResponse = await emptyNameResponse.json();
      console.log('✅ Empty name validation working:', errorResponse);
    } else {
      console.log('❌ Expected 400 status for empty name');
    }

  } catch (error) {
    console.error('❌ Validation test failed:', error);
  }
}

// Run all tests
async function runAllTests() {
  await testDepartmentsAPI();
  await testValidationScenarios();
}

// Check if running directly
if (typeof window === 'undefined') {
  // Node.js environment
  runAllTests().catch(console.error);
} else {
  // Browser environment
  console.log('Run this script in Node.js or use the browser console to test the API endpoints manually.');
  console.log('Example usage:');
  console.log('node test-departments-integration.js');
}

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testDepartmentsAPI,
    testValidationScenarios,
    runAllTests,
    testDepartmentData,
    updateDepartmentData
  };
}
