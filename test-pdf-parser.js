// Simple test script to verify PDF parsing functionality
const { pdfParserService } = require('./lib/pdf-parser-service.ts');

async function testPDFParsing() {
  console.log('🧪 Testing PDF Parser Service...\n');
  
  try {
    // Test Strategic Plan parsing
    console.log('📄 Testing Strategic Plan 2025-2029...');
    const strategicPlan = await pdfParserService.createResourceFromFile(
      '/STRATEGIC PLAN 2025 2029.pdf',
      'doc',
      {
        title: 'Strategic Plan 2025-2029',
        author: 'Kenya Sugar Board',
        category: 'Strategy',
        description: 'Comprehensive strategic plan for the Kenya Sugar Board'
      }
    );
    
    console.log('✅ Strategic Plan parsed successfully:');
    console.log(`   Title: ${strategicPlan.title}`);
    console.log(`   Author: ${strategicPlan.author}`);
    console.log(`   Category: ${strategicPlan.category}`);
    console.log(`   Chapters: ${strategicPlan.content.chapters.length}`);
    console.log(`   Content length: ${strategicPlan.content.extractedText.length} characters`);
    console.log('');
    
    // Test Agroforestry document parsing
    console.log('🌱 Testing Agroforestry document...');
    const agroforestry = await pdfParserService.createResourceFromFile(
      '/How-agroforestry-and-carbon-markets-are-transforming-farming-in-eastern-Kenya.pdf',
      'article',
      {
        title: 'How Agroforestry and Carbon Markets are Transforming Farming in Eastern Kenya',
        author: 'International Development Research',
        category: 'Sustainability',
        description: 'Analysis of agroforestry and carbon market transformation'
      }
    );
    
    console.log('✅ Agroforestry document parsed successfully:');
    console.log(`   Title: ${agroforestry.title}`);
    console.log(`   Author: ${agroforestry.author}`);
    console.log(`   Category: ${agroforestry.category}`);
    console.log(`   Chapters: ${agroforestry.content.chapters.length}`);
    console.log(`   Content length: ${agroforestry.content.extractedText.length} characters`);
    console.log('');
    
    // Test search functionality
    console.log('🔍 Testing search functionality...');
    const documents = [strategicPlan, agroforestry];
    const searchResults = pdfParserService.searchDocuments(documents, 'strategic');
    console.log(`✅ Search for "strategic" found ${searchResults.length} documents`);
    
    const sustainabilityResults = pdfParserService.searchDocuments(documents, 'carbon');
    console.log(`✅ Search for "carbon" found ${sustainabilityResults.length} documents`);
    
    console.log('\n🎉 All tests completed successfully!');
    
    // Display sample chapter content
    console.log('\n📖 Sample Chapter Content (Strategic Plan):');
    console.log(strategicPlan.content.chapters[0].title);
    console.log(strategicPlan.content.chapters[0].content.substring(0, 200) + '...');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

// Run the test
if (require.main === module) {
  testPDFParsing();
}

module.exports = { testPDFParsing };
