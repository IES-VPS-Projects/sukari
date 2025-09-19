export interface ResourceDocument {
  id: string
  title: string
  type: 'article' | 'doc' | 'publication' | 'report' | 'case-study'
  author: string
  readTime: string
  savedDate: string
  category: string
  description: string
  content: {
    extractedText: string
    chapters: Array<{
      title: string
      content: string
      pageNumber: number
    }>
    summary: string
  }
  tags: string[]
  isPopular?: boolean
  image?: string
}

export const resourceCenterData: ResourceDocument[] = [
  // Strategic Plan 2025-2029 Document
  {
    id: 'strategic-plan-2025-2029',
    title: 'Strategic Plan 2025-2029',
    type: 'doc',
    author: 'Kenya Sugar Board',
    readTime: '25 min',
    savedDate: '2024-12-01',
    category: 'Strategy',
    description: 'Comprehensive strategic roadmap for Kenya\'s sugar industry transformation from 2025-2029, outlining vision, mission, strategic objectives, and implementation framework for creating a globally competitive and sustainable sugar sector.',
    content: {
      extractedText: `
        Kenya Sugar Board Unveils Ambitious 2025-2029 Strategic Plan

        NAIROBI, Kenya – The Kenya Sugar Board (KSB) has officially launched its inaugural Draft Strategic Plan for the period 2025-2029. This landmark document sets a clear roadmap for revitalizing Kenya's sugar industry, aiming to transform it into a globally competitive sector that significantly improves livelihoods. The plan, developed following the KSB's re-establishment under the Sugar Act 2024, builds on past achievements and lessons learned, particularly from its time under the Agriculture and Food Authority (AFA).

        The Strategic Plan is closely aligned with the Kenyan Government's economic development blueprints, including Kenya Vision 2030 and its Fourth Medium Term Plan, as well as the Bottom-Up Economic Transformation Agenda (BETA) and the Ministry of Agriculture and Livestock Development's policies. It also contributes to broader regional and international development frameworks, such as the East Africa Community (EAC) Vision 2050, African Union (AU) Agenda 2063, and the United Nations 2030 Agenda for Sustainable Development.

        Despite the sugar industry's vital role, it faces significant challenges. These include occasional uncontrolled sugar imports, price distortions, high production costs, low productivity, inefficient operations, and the pervasive impact of climate change. However, the Government is committed to transforming the sector through legal, policy, and strategic interventions. This Strategic Plan prioritizes strengthening production efficiency and value addition to ensure enhanced benefits for all stakeholders.
      `,
      chapters: [
        { 
          title: 'Kenya Sugar Board Unveils Ambitious 2025-2029 Strategic Plan', 
          content: `
            <p><strong>NAIROBI, Kenya –</strong> The Kenya Sugar Board (KSB) has officially launched its inaugural Draft Strategic Plan for the period 2025-2029. This landmark document sets a clear roadmap for revitalizing Kenya's sugar industry, aiming to transform it into a globally competitive sector that significantly improves livelihoods. The plan, developed following the KSB's re-establishment under the Sugar Act 2024, builds on past achievements and lessons learned, particularly from its time under the Agriculture and Food Authority (AFA).</p>
            
            <p>The Strategic Plan is closely aligned with the Kenyan Government's economic development blueprints, including Kenya Vision 2030 and its Fourth Medium Term Plan, as well as the Bottom-Up Economic Transformation Agenda (BETA) and the Ministry of Agriculture and Livestock Development's policies. It also contributes to broader regional and international development frameworks, such as the East Africa Community (EAC) Vision 2050, African Union (AU) Agenda 2063, and the United Nations 2030 Agenda for Sustainable Development.</p>
            
            <p>Despite the sugar industry's vital role, it faces significant challenges. These include occasional uncontrolled sugar imports, price distortions, high production costs, low productivity, inefficient operations, and the pervasive impact of climate change. However, the Government is committed to transforming the sector through legal, policy, and strategic interventions. This Strategic Plan prioritizes strengthening production efficiency and value addition to ensure enhanced benefits for all stakeholders.</p>
            
            <p>Hon. Eng. Nicholas Gumbo Wajonya, EGH, Chairman of the KSB, reiterated the Board's full commitment to the plan's implementation, urging all industry stakeholders to offer their support for the realization of its transformative outcomes. Ag. Chief Executive Officer, Jude Chesire, also affirmed the Board's dedication to this comprehensive roadmap for a competitive, sustainable, and inclusive sugar sector.</p>
          `,
          pageNumber: 1 
        },
        { 
          title: 'Vision, Mission, and Core Values: KSB\'s Guiding Principles', 
          content: `
            <p>The Kenya Sugar Board's Strategic Plan 2025-2029 is anchored on a clear set of guiding principles designed to steer the industry towards global competitiveness and sustainable growth.</p>
            
            <h3>Vision Statement:</h3>
            <p>The KSB's overarching ambition is to be: <strong>"A world class facilitator of a globally competitive sugar industry for improved livelihood"</strong>. This vision is driven by stakeholder-centricity, industry innovation, and a transparent regulatory environment.</p>
            
            <h3>Mission Statement:</h3>
            <p>To achieve this vision, the Board's mission is: <strong>"To sustainably develop, promote and regulate the sugar industry for economic growth and transformation"</strong>.</p>
            
            <h3>Core Values (TIPIC):</h3>
            <p>The Board has adopted five core values, encapsulated in the acronym TIPIC, which underpin its performance, operations, and relationships with both internal and external stakeholders:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Teamwork:</strong> Emphasizing collaborative efforts to achieve common goals within the industry.</li>
              <li><strong>Integrity:</strong> Upholding ethical and transparent operations across all aspects of the sugar industry.</li>
              <li><strong>Professionalism:</strong> Adhering to high standards of conduct and expertise in all activities.</li>
              <li><strong>Innovativeness:</strong> Encouraging new ideas and approaches to improve industry efficiency and sustainability.</li>
              <li><strong>Customer Focus:</strong> Prioritizing the needs and satisfaction of all stakeholders, including consumers, producers, and the public.</li>
            </ul>
            
            <h3>Quality Policy Statement:</h3>
            <p>The KSB is dedicated to regulating, developing, and promoting a globally competitive and sustainable sugar industry efficiently and innovatively. This commitment demands strict adherence to quality standards. The Board pledges to:</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Uphold and enforce sugar industry standards in line with national laws, international best practices, and stakeholder expectations.</li>
              <li>Support the adoption of modern technologies, research, and industry best practices to enhance productivity and quality.</li>
              <li>Provide timely, transparent, and responsive services to all stakeholders.</li>
              <li>Establish, maintain, and continuously improve its Quality Management System (QMS) per ISO 9001:2015 requirements.</li>
              <li>Promote awareness of this quality policy and ensure transparency with stakeholders.</li>
              <li>Implement, monitor, and regularly review this policy and its objectives for compliance and sustainability.</li>
            </ul>
          `,
          pageNumber: 2 
        },
        { 
          title: 'KSB\'s Mandate and Functions Under the Sugar Act 2024', 
          content: `
            <p>The Kenya Sugar Board's (KSB) mandate, as explicitly spelt out in Section 4 of the Sugar Act 2024, positions it as the central authority for guiding and overseeing the sugar industry's growth and operations.</p>
            
            <h3>The main functions of the Board are to:</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li>Regulate, develop, and promote the sugar industry.</li>
              <li>Co-ordinate the activities of value chain actors within the industry.</li>
              <li>Facilitate equitable access to the benefits and resources of the industry by all interested parties.</li>
            </ul>
            
            <p>This mandate underscores the Board's commitment to ensuring the industry operates transparently, efficiently, and sustainably, serving the interests of consumers, producers, and the broader public alike.</p>
            
            <h3>In accordance with Section 4 (2) of the Sugar Act 2024, the specific functions of the Board include:</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Policy Formulation and Implementation:</strong> Participating in the development and execution of overall policies, plans, and programs for industry development.</li>
              <li><strong>Government Intermediary:</strong> Acting as a crucial link between the industry and the Government.</li>
              <li><strong>Research Linkages:</strong> Establishing connections with government agencies and research institutions to enhance quality assurance and research, facilitating the flow of research findings to stakeholders.</li>
              <li><strong>Market Monitoring:</strong> Overseeing and regulating the domestic market to identify distortions and advise the Government and stakeholders on corrective measures.</li>
              <li><strong>Advisory Services:</strong> Guiding national and county governments on agricultural levies and providing advisory services to growers, out-grower institutions, and millers.</li>
              <li><strong>Trade Facilitation:</strong> Facilitating the sale, import, and export of sugar and sugar products.</li>
              <li><strong>Environmental Promotion:</strong> Encouraging the use of environmentally friendly technologies within the industry.</li>
              <li><strong>Equitable Pricing:</strong> Collaborating with county governments to implement fair mechanisms for sugar crop pricing and the appropriation of by-product proceeds.</li>
              <li><strong>International Collaboration:</strong> Working with national and international trade bodies on sugar-related matters.</li>
              <li><strong>Standards and Licensing:</strong> Overseeing the formulation of standard provisions governing rights and obligations, collecting industry statistics, maintaining a database, and registering and licensing sugar and jaggery mills, exporters, importers, and dealers.</li>
              <li><strong>Compliance and Enforcement:</strong> Enforcing and monitoring compliance with standards across the sugar value chain.</li>
              <li><strong>Value Addition:</strong> Promoting and advising on strategies for value addition and product diversification.</li>
              <li><strong>Strategic Planning:</strong> Formulating a strategic plan for the sugar sub-sector at least once every five years in consultation with county governments and stakeholders.</li>
              <li><strong>Transportation and Disposal Guidelines:</strong> Formulating guidelines for efficient, safe, and economical transportation of sugar crops and disposal of unutilized by-products.</li>
              <li><strong>Market Information Dissemination:</strong> Gathering and distributing market information on regional and global supply chain dynamics for stakeholder benefit.</li>
              <li><strong>Public Participation:</strong> Ensuring adequate public participation and consultation with growers in decision-making affecting the industry.</li>
              <li><strong>Institutional Linkages:</strong> Promoting industry efficiency and development through appropriate institutional linkages.</li>
              <li><strong>Other Functions:</strong> Performing any other functions conferred by the Sugar Act or other written laws.</li>
            </ul>
          `,
          pageNumber: 3 
        },
        { 
          title: 'Kenya\'s Sugar Industry: A Historical Perspective and Current Landscape', 
          content: `
            <p>Kenya's sugar industry, a vital economic catalyst, has a rich history tracing back to the early 1900s with the introduction of sugarcane cultivation around Lake Victoria. The first sugar factory was established in Miwani, Kisumu County, in 1922. Post-independence, the industry expanded rapidly, solidifying sugarcane's position as the fourth major cash crop after horticulture, tea, and coffee.</p>
            
            <h3>Evolution of the Kenya Sugar Board:</h3>
            <p>The regulatory framework for the industry has undergone several transformations. Initially, the Kenya Sugar Authority was established in 1973. This was succeeded by the Kenya Sugar Board (KSB) in 2002 under the Sugar Act 2001, mandated to regulate, develop, and promote the sector. However, in 2013, KSB was merged into the Agriculture and Food Authority (AFA) as the Sugar Directorate, a move that faced numerous challenges and failed to achieve its objectives. Consequently, on 1st November 2024, the Kenya Sugar Board was re-established under the new Sugar Act 2024, marking a return to a commodity-specific regulatory framework to enhance sector-focused governance and policy responsiveness.</p>
            
            <h3>Current Industry Snapshot:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Operational Mills:</strong> Kenya currently boasts 17 licensed mills, with 15 actively operational. This includes four recently leased state-owned factories (South Nyanza, Nzoia, Muhoroni, and Chemelil Sugar Companies Ltd) and private players like West Kenya, Butali, Kibos, and Transmara.</li>
              <li><strong>Farmer Livelihoods:</strong> The industry is a cornerstone of rural economies, supporting over 350,000 farmers, with smallholders accounting for 94% across 15 counties. It sustains the livelihoods of an estimated nine million Kenyans.</li>
              <li><strong>Economic Contribution:</strong> Sugarcane contributes approximately 5.4% to agricultural GDP. In 2023, it accounted for 8.4% of the marketed value of all crops.</li>
              <li><strong>Production & Deficit:</strong> Despite expanding cane acreage from 126,826 hectares in 2002 to 293,303 hectares in 2024, sugar production reached 815,454 Metric Tonnes (MT) in 2023. However, national consumption stood at 1.14 million MT in 2024, resulting in a 30% production deficit that necessitates imports, primarily from COMESA and EAC partners. Demand is projected to exceed 1.25 million MT in the next five years.</li>
              <li><strong>Untapped Potential:</strong> Beyond sugar, the industry holds significant untapped potential in clean energy generation. With a combined crushing capacity of 55,900 Tonnes of Cane per Day (TCD), sugar mills can drive economic diversification and energy transformation through cogeneration.</li>
            </ul>
          `,
          pageNumber: 4 
        },
        { 
          title: 'Situational Analysis - Navigating External Opportunities and Threats', 
          content: `
            <p>The KSB's Strategic Plan is developed against a comprehensive analysis of its external operating environment, considering political, economic, social, technological, ecological, and legal (PESTEL) factors.</p>
            
            <h3>External Environment - Opportunities & Threats:</h3>
            
            <h4>Political:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Opportunities:</strong> Leveraging coordination between national and county governments, regional diplomacy for fair safeguards, political goodwill for reforms.</li>
              <li><strong>Threats:</strong> Policy volatility (import waivers, tariff shifts), politicization of privatization, cross-border smuggling, inter-county rivalry, inadequate county cooperation.</li>
            </ul>
            
            <h4>Economic:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Opportunities:</strong> Promoting high sugarcane productivity and efficiency, industry diversification (ethanol, cogeneration), strengthening value chain finance, attracting investment to reduce deficits and generate exports.</li>
              <li><strong>Threats:</strong> Credit constraints, high production costs (inputs, transport, energy), waning farmer confidence, competition from cheap imports, poor road infrastructure, forex fluctuations.</li>
            </ul>
            
            <h4>Social:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Opportunities:</strong> Mainstreaming women and youth participation, enhancing production for growing population, nutrition education/product diversification, community development compacts, enforcing fair trade regulations.</li>
              <li><strong>Threats:</strong> Changing dietary preferences, labour disputes/unrest, rural-urban migration/aging farmer base, erosion of trust from historical grievances (disputed weights, cane poaching, delayed payments).</li>
            </ul>
            
            <h4>Technological:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Opportunities:</strong> Improving sugarcane yield with new technology (varieties, soil testing, mechanization, irrigation), shift to renewable energy, digitization of cane supply chain (automated weighbridges, ERP, mobile apps), leveraging modern tech for stakeholder engagement.</li>
              <li><strong>Threats:</strong> High capital expenditure for modernization, risk of smallholder exclusion, technology fragmentation/interoperability issues, cybersecurity/data risks, rapid obsolescence, lack of climate data collection.</li>
            </ul>
            
            <h4>Ecological:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Opportunities:</strong> Cleaner environmental footprint, diversification into other sugar crops (sugar beet), intercropping, soil rehabilitation, integrated pest management, climate-smart practices, payment for ecosystem services (carbon projects, bagasse energy).</li>
              <li><strong>Threats:</strong> Inadequate climate change adaptation, environmental pollution by mills, shrinking agricultural land, extreme weather events, soil degradation, increased pest vulnerability.</li>
            </ul>
            
            <h4>Legal:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Opportunities:</strong> Policy interventions and harmonization of regulations, enforcement and compliance, use of Alternative Dispute Resolutions, collaborative framework with county governments, the new Sugar Act 2024.</li>
              <li><strong>Threats:</strong> Regulatory overlap/ambiguity, unpredictable changes in tax/levy/import quotas, litigation threats, legislation gaps, delayed reforms.</li>
            </ul>
            
            <h4>Industry Environment:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Opportunities:</strong> Value addition and diversification, strong historical foundation, expansion of cane acreage, increasing domestic demand.</li>
              <li><strong>Threats:</strong> Persistent production deficits, sub-optimal mill operations, high competition from imported sugar, import dependency.</li>
            </ul>
          `,
          pageNumber: 5 
        },
        { 
          title: 'Situational Analysis - Internal Environment and Past Performance', 
          content: `
            <p>A thorough analysis of the KSB's internal environment has revealed both strengths and weaknesses that will influence the implementation of the Strategic Plan. Additionally, a review of past performance, including its time as the Sugar Directorate under AFA, has provided critical lessons.</p>
            
            <h3>Internal Environment - Strengths and Weaknesses:</h3>
            
            <h4>Governance and Administrative Structure:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Strengths:</strong> Multi-stakeholder representation at the Board of Directors (BoD) level, strong legal backing from the Sugar Act 2024, approved governance and administration structures, supportive leadership.</li>
              <li><strong>Weaknesses:</strong> Challenges in implementing BoD recruitment, internal bureaucracy causing policy implementation delays, occasional susceptibility to external influence/industry politics, non-representation of KESRETI in the BoD.</li>
            </ul>
            
            <h4>Internal Business Processes:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Strengths:</strong> Automated business processes (Integrated Management Information System - IMIS, Enterprise Resource Planning - ERP, Miwa Bora App for information dissemination, levy collection system), established procedure manuals, collaborative frameworks with other Government agencies.</li>
              <li><strong>Weaknesses:</strong> Fragmented and stand-alone ICT systems on obsolete technologies, prone to cyber-attacks, lack of proper data management, lack of Quality Management System (QMS), inadequate backup systems, insufficient collaboration with specific county governments, limited use of competition metrics in policymaking, weak policy/regulation enforcement linkages, inadequate system integration with millers.</li>
            </ul>
            
            <h4>Resources and Capabilities:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Strengths:</strong> Ring-fenced revenue source through the Sugar Development Levy (SDL), skilled, competent, and diverse human capital, strong ICT infrastructure with upscale capability, positive organizational culture, remarkable institutional memory, regional presence across major sugar zones.</li>
              <li><strong>Weaknesses:</strong> Limited financial resource mobilization, inadequate human capital, weak enforcement of industry regulations, skill-set and competence gaps, weak internal data management, inadequate laboratory facilities for real-time sugar testing in some counties, resource constraints for routine field inspections, inadequate ICT backup infrastructure.</li>
            </ul>
            
            <h3>Analysis of Past Performance:</h3>
            
            <h4>Key Achievements:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li>Promoting sugarcane cultivation across 293,303 Ha.</li>
              <li>Developing and implementing the cane pricing model.</li>
              <li>Facilitating industry research.</li>
              <li>Overseeing the growth to 15 licensed millers.</li>
              <li>Sustained sugar production, reaching 815,454 MT.</li>
              <li>Facilitating development of various policies and regulations.</li>
              <li>Operationalizing the Sugar Development Levy (SDL).</li>
            </ul>
            
            <h4>Challenges Faced:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li>Declining cane yield and low factory efficiency.</li>
              <li>Unstable cane and sugar prices.</li>
              <li>Limited diversification of sugarcane products and adoption of modern farming technologies.</li>
              <li>Financial constraints.</li>
              <li>Heavy political patronage.</li>
              <li>Occasional non-compliance with regulations.</li>
              <li>Climate change impacts.</li>
            </ul>
            
            <h4>Lessons Learned and Opportunities:</h4>
            <ul class="list-disc pl-6 space-y-1">
              <li>The ring-fenced SDL provides a stable funding source for industry growth.</li>
              <li>The Sugar Act 2024 offers a strong legal framework for regulation, promotion, and development.</li>
              <li>Regional and international trade treaties (COMESA, AfCFTA) present opportunities.</li>
              <li>The Public Private Partnership Act No. 14 of 2021 facilitates investment.</li>
              <li>The re-established Kenya Sugar Research and Training Institute (KESRETI) will boost research.</li>
              <li>Strong political goodwill, evidenced by the leasing of public mills to private investors for 30 years, signals a commitment to revitalization.</li>
            </ul>
          `,
          pageNumber: 6 
        },
        { 
          title: 'Strategic Issues, Goals, and Key Result Areas for Transformation', 
          content: `
            <p>The KSB's Strategic Plan 2025-2029 directly addresses critical challenges identified through comprehensive situational and stakeholder analyses. These form the bedrock of its strategic direction.</p>
            
            <h3>Five Strategic Issues Requiring Urgent Response:</h3>
            <ol class="list-decimal pl-6 space-y-2">
              <li><strong>Sub-optimal factory sugar production, and declining farm-level productivity of cane:</strong> Characterized by outdated agronomic practices, limited access to improved seed varieties and quality inputs, low farmer training, underutilization of modern technologies, and factory inefficiencies leading to high production costs and poor returns.</li>
              <li><strong>The need for strong regulatory framework and enforcement that ensures compliance:</strong> Marked by weak compliance, policy and legal gaps in the Sugar Act 2024, and limited enforcement capacity, resulting in unregulated trade, inconsistent pricing, and compromised sugar quality.</li>
              <li><strong>Weak linkage of research, innovation, diversification, and modern technology adoption, coupled with limited partnerships:</strong> Evidenced by insufficient investment in R&D, low uptake of innovations, poor integration of research outputs into practice, limited modernized farming, and fragmented collaboration among industry players.</li>
              <li><strong>Mainstreaming of cross-cutting issues in the industry:</strong> A persistent gap in integrating critical concerns such as gender equity, youth inclusion, health and social issues, waste management, environmental sustainability, and climate change adaptation into industry policies and operations.</li>
              <li><strong>Inadequate institutional resources, capacity, and governance systems:</strong> The Board is constrained by insufficient policies, procedures, and operational manuals, occasional political patronage, limited human capital, sub-optimal staff productivity, financial constraints, and gaps in automation, collectively hindering its mandate.</li>
            </ol>
            
            <h3>Five Strategic Goals to Address Challenges:</h3>
            <ol class="list-decimal pl-6 space-y-1">
              <li>Increased production efficiency in sugar industry.</li>
              <li>Well-regulated sugar industry.</li>
              <li>Enhanced mutual growth of sugar industry.</li>
              <li>Sustainable sugarcane production.</li>
              <li>Enhanced institutional capacity.</li>
            </ol>
            
            <h3>Five Key Result Areas (KRAs) for Focused Action:</h3>
            <ol class="list-decimal pl-6 space-y-2">
              <li><strong>Sugarcane production and productivity:</strong> To facilitate increased national average sugarcane yield to 80 TCH by 2030 and promote growth and efficiency in national sugar production. This is fundamental to KSB's mandate.</li>
              <li><strong>Effective industry regulation:</strong> To ensure stability, competitiveness, and sustainability, promote fair competition, protect farmers, curb illegal imports, and enforce quality, environmental, and safety standards.</li>
              <li><strong>Research, partnerships, and industry diversification:</strong> To provide credible industry data, achieve a diversified sugar industry driven by research, innovation, and strategic partnerships, and enhance institutional governance and performance of farmer organizations.</li>
              <li><strong>Industry sustainability:</strong> To promote an environmentally responsible, socially inclusive, and well-governed sugar industry value chain, mainstreaming ESG compliance and facilitating value chain financing.</li>
              <li><strong>Institutional development:</strong> To build a strong, well-structured, resourced, and capacitated Board through investment in human capital, modern ICT infrastructure, efficient processes, and robust governance to restore stakeholder confidence.</li>
            </ol>
          `,
          pageNumber: 7 
        },
        { 
          title: 'Driving Change: KSB\'s Ten Strategic Objectives and Key Strategies', 
          content: `
            <p>The Kenya Sugar Board's Strategic Plan 2025-2029 outlines ten distinct strategic objectives designed to revitalize and sustain the sugar industry, directly contributing to the vision of a globally competitive sector. Each objective is supported by targeted strategies providing clear pathways for implementation and industry transformation.</p>
            
            <ol class="list-decimal pl-6 space-y-3">
              <li>
                <strong>To facilitate an increase in national average sugarcane yield to 80 TCH by 2030:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Facilitating access to improved seed cane varieties</li>
                  <li>Promoting climate-smart technologies and Good Agricultural Practices (GAPs)</li>
                  <li>Leveraging geo-spatial intelligence for precision agriculture</li>
                  <li>Building capacity of out-grower institutions to own farm machinery</li>
                  <li>Supporting low-cost innovations for smallholder farmers</li>
                </ul>
              </li>
              
              <li>
                <strong>To promote growth and efficiency in national sugar production:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Operationalizing the Quality-Based Cane Payment System (QBCPS)</li>
                  <li>Improving factory efficiency and recovery rates</li>
                  <li>Targeting annual national sugar output of 1.2 million tonnes</li>
                </ul>
              </li>
              
              <li>
                <strong>To create an enabling legal and regulatory framework for the sugar industry:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Strengthening industry policies and regulations</li>
                  <li>Enhancing compliance and industry competitiveness</li>
                </ul>
              </li>
              
              <li>
                <strong>To establish a robust compliance and enforcement system:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Establishing and enforcing industry standards and codes of practice</li>
                  <li>Enhancing inspection, surveillance, and monitoring mechanisms</li>
                </ul>
              </li>
              
              <li>
                <strong>To provide credible industry data for informed decision-making:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Monitoring local and global market trends</li>
                  <li>Providing timely information to stakeholders</li>
                  <li>Promoting adoption of new technologies in sugarcane mapping and yield prediction</li>
                </ul>
              </li>
              
              <li>
                <strong>To achieve a diversified sugar industry driven by research, innovation, and strategic partnerships:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Promoting value addition and diversification (e.g., ethanol, cogenerated power)</li>
                  <li>Promoting trade and investment in the sugar industry value chain</li>
                  <li>Promoting research and innovations</li>
                </ul>
              </li>
              
              <li>
                <strong>To enhance institutional governance, resilience and performance of sugarcane farmers' organizations:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Strengthening the institutional capacity and governance of sugarcane farmer organizations</li>
                </ul>
              </li>
              
              <li>
                <strong>To promote an environmentally responsible, socially inclusive and well-governed sugar industry value chain:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Mainstreaming Environmental, Social, and Governance (ESG) compliance and sustainability</li>
                  <li>Facilitating value chain financing</li>
                </ul>
              </li>
              
              <li>
                <strong>To sustain a well-resourced, efficient, and adaptive institution:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Enhancing human capital capacity, work environment, and knowledge management</li>
                  <li>Operationalizing resource mobilization</li>
                  <li>Strengthening the Board's corporate governance</li>
                </ul>
              </li>
              
              <li>
                <strong>To improve service delivery through operational efficiency and effectiveness:</strong>
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Strengthening corporate planning, monitoring, and evaluation</li>
                  <li>Automating business processes</li>
                </ul>
              </li>
            </ol>
          `,
          pageNumber: 8 
        },
        { 
          title: 'Implementation, Coordination, and Resource Mobilization', 
          content: `
            <p>Effective execution of the Strategic Plan 2025-2029 is paramount for the Kenya Sugar Board. The plan outlines robust frameworks for implementation, coordination, and resource management to translate strategic objectives into tangible results.</p>
            
            <h3>Implementation Plan:</h3>
            <p>The KSB's implementation plan serves as a roadmap, aligning all staff with corporate goals through a structured approach.</p>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Action Plan:</strong> A detailed implementation matrix captures key activities, expected outputs, Key Performance Indicators (KPIs), targets, and budgets, with clear responsibility centres.</li>
              <li><strong>Annual Work Plan and Budget:</strong> Breaks down the Strategic Plan into yearly milestones, defining specific activities, timelines, and financial resources.</li>
              <li><strong>Performance Contracting (PC):</strong> Used as a tool to align corporate goals with measurable targets, ensuring accountability at directorate, department, and individual levels.</li>
            </ul>
            
            <h3>Coordination Framework:</h3>
            <p>Successful implementation demands effective inter-directorate and inter-departmental collaboration, supported by a clear institutional framework, human capital, leadership, systems, and procedures.</p>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Institutional Framework:</strong> Governed by the Sugar Act 2024 and an approved organizational structure involving the Board of Directors, Chief Executive Officer, Heads of Directorates, and Heads of Departments. Key directorates include Regulation & Compliance, Sugar Development & Advisory Services, Market Research & Product Promotion, Fund Management, Human Resource & Administration, Finance & Planning, and Internal Audit & Risk Assurance.</li>
              <li><strong>Staff Establishment:</strong> The Board has an in-post staff compliment of 126 against an optimal establishment of 239, indicating a variance of 113 personnel. Initiatives for strengthening human resource capacity include recruitment, continuous professional development, workload analysis, skill gap analysis, and culture change programs.</li>
              <li><strong>Strategic Theme Teams (STTs):</strong> Appointed to champion implementation of thematic areas, ensuring activities align with strategic goals and are well-coordinated across departments.</li>
              <li><strong>Systems and Procedures:</strong> KSB will develop and institutionalize Standard Operations Procedures (SOPs), guidelines, and digital management systems. Key systems include the Quality-Based Cane Payment System (QBCPS), sugar industry traceability system, Knowledge Management repository, Centralized Remote Sensing and GIS data hub, Quality Management System (QMS), Integrated Management Information System (IMIS), Disaster Recovery Plan (DRP), and Enterprise Risk Management (ERM) system.</li>
            </ul>
            
            <h3>Resource Requirements and Mobilization Strategies:</h3>
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
              <p class="text-red-800">The Strategic Plan's total estimated cost over the planning period is <strong>Ksh 38.43 billion</strong>, inclusive of administration expenses. However, the projected financial inflow is Ksh 35.0 billion, leaving an anticipated financial resource gap of <strong>Ksh 3.4 billion</strong>.</p>
            </div>
            
            <p>To bridge this gap, KSB plans to:</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Enhance collection of the Sugar Development Levy (SDL) in collaboration with Kenya Revenue Authority (KRA)</li>
              <li>Lobby for sustained government budgetary support by aligning objectives with national priorities</li>
              <li>Strengthen mechanisms for internally generated revenues through licensing fees, training programs, certification services, and industry data services</li>
              <li>Leverage Public Private Partnerships (PPPs) for joint investments in infrastructure, research, extension services, and value addition</li>
              <li>Engage with bilateral and multilateral donors and development partners to fund programs on climate-smart agriculture, farmer capacity building, and market access</li>
              <li>Explore regional and international collaboration opportunities under frameworks like COMESA, AfCFTA, and Green Climate Fund (GCF) for funding capacity building, trade facilitation, and sustainability programs</li>
            </ul>
          `,
          pageNumber: 9 
        },
        { 
          title: 'Risk Management and Monitoring & Evaluation for Accountability', 
          content: `
            <p>To ensure the successful realization of its Strategic Plan, the Kenya Sugar Board has integrated robust risk management and monitoring, evaluation, and reporting (MER) frameworks.</p>
            
            <h3>Risk Management Framework:</h3>
            <p>This framework is crucial for safeguarding KSB's assets, maintaining its reputation, and ensuring compliance. Its objectives include protecting financial health, ensuring compliance with legal mandates, improving operational efficiency, and fostering a risk-aware culture.</p>
            
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Risk Governance and Oversight:</strong> Responsibility is vested from the Board of Directors (BoD) to individual staff members, with the BoD approving the Enterprise Risk Management (ERM) framework and setting risk appetite.</li>
              <li><strong>Risk Identification:</strong> Potential events affecting KSB's objectives are systematically identified and categorized (Strategic, Financial, Operational, Regulatory, Reputational, Technological, and Environmental risks).</li>
              <li><strong>Risk Assessment:</strong> Risks are assessed based on their likelihood of occurrence and severity of impact, rated using a defined risk scoring model.</li>
              <li><strong>Risk Mitigation and Control:</strong> Measures include developing and enforcing policies, maintaining internal controls, staff training, insurance, and investing in appropriate technology.</li>
              <li><strong>Monitoring and Reporting:</strong> The Internal Audit and Risk Assurance directorate will regularly monitor risks through audits, KPI tracking, and performance reviews, escalating early warnings as needed.</li>
              <li><strong>Risk Communication and Awareness:</strong> KSB will promote activities to foster a risk-aware culture, encouraging staff to report incidents and suggest improvements.</li>
            </ul>
            
            <h3>Examples of Key Risks and Mitigation Measures:</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Inadequate financial resource mobilization:</strong> Effective coordination with KRA for SDL collection, implementing effective revenue mobilization strategies, developing alternative revenue sources.</li>
              <li><strong>Budget overruns:</strong> Aligning budgets to priority programs, periodic budget monitoring, rationalization of expenditure.</li>
              <li><strong>Difficulty in attracting or retaining skilled human capital:</strong> Competitive compensation, proper HR planning, career development, conducive work environment, staff motivation programs.</li>
              <li><strong>Fraud or misappropriation of funds:</strong> Segregation of financial duties, dual approvals, regular internal audits, reinforcing code of conduct, early detection systems.</li>
              <li><strong>Work related accidents:</strong> Insurance under WIBA, emergency preparedness training, proper orientation for tools and machines.</li>
              <li><strong>Cyberattacks:</strong> Installing firewalls/antivirus, cybersecurity awareness training, regular system updates, secure passwords, staff sensitization.</li>
            </ul>
            
            <h3>Monitoring, Evaluation, and Reporting (MER) Framework:</h3>
            <p>This framework guides continuous tracking of progress and informs timely decision-making.</p>
            
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Monitoring:</strong> Focuses on activities and outputs, with reports generated monthly at the unit level, quarterly by Strategic Theme Teams, and semi-annually by the Head of Corporate Planning.</li>
              <li><strong>Performance Standards:</strong> KSB will use specific benchmarks (Excellent, Very Good, Good, Fair, Unsatisfactory) to rate performance based on achievement against targets.</li>
              <li><strong>Evaluation:</strong> Independent mid-term evaluation will be conducted in January 2028, and an end-term evaluation in June 2030. Evaluation criteria include Relevance, Coherence, Effectiveness, Efficiency, Impact, and Sustainability of interventions.</li>
              <li><strong>Reporting and Feedback:</strong> Reports will inform the Board's leadership for strategic decisions, with annual progress reports presented to the Board of Directors for review and necessary adjustments to strategies and resource allocation. This ensures accountability and continuous improvement.</li>
            </ul>
          `,
          pageNumber: 10 
        }
      ],
      summary: 'Comprehensive strategic roadmap for Kenya\'s sugar industry transformation from 2025-2029, outlining vision, mission, strategic objectives, and implementation framework for creating a globally competitive and sustainable sugar sector.'
    },
    tags: ['strategy', 'planning', 'regulation', 'development', 'sugar industry', 'Kenya'],
    isPopular: true,
    image: '/images/ksb2.png'
  },

  // Agroforestry Article
  {
    id: 'agroforestry-carbon-markets',
    title: 'How Agroforestry and Carbon Markets are Transforming Farming in Eastern Kenya',
    type: 'article',
    author: 'Farm Africa & AGRA',
    readTime: '28 min',
    savedDate: '2024-08-15',
    category: 'Sustainability',
    description: 'A comprehensive seven-chapter analysis exploring how agroforestry and carbon market initiatives in eastern Kenya are creating new income streams for farmers while contributing to climate action through tree planting and carbon credit programs.',
    content: {
      extractedText: `
        How Agroforestry and Carbon Markets are Transforming Farming in Eastern Kenya
        
        A groundbreaking initiative is taking root in eastern Kenya, promising a dual benefit of climate action and financial empowerment for smallholder farmers. Since 2020, Farm Africa, in collaboration with AGRA, has been spearheading an agroforestry project that ingeniously integrates carbon-based incentives with sustainable agricultural practices. The heart of this programme lies in the ACORN/Rabobank partnership, allowing farmers to earn additional income by planting trees and, crucially, monetising the carbon these trees store by selling Carbon Removal Units (CRUs).

        By the close of 2023, the initiative had successfully enrolled 21,658 farmers, transforming 14,175 hectares of land through tree planting. More importantly, 7,375 farmers have already reaped the financial rewards, selling 24,945 Carbon Removal Units (CRUs) and receiving payments in cash and in-kind seedlings. These efforts have led to a verifiable 24,945 tCO2e in emission reductions, a significant step towards climate mitigation.

        The project employs sustainable agroforestry practices, strategically selecting diverse tree species for optimal carbon sequestration capabilities. Farmers are experiencing 30-50% increases in soil organic matter and water retention, while also benefiting from improved biodiversity and microclimate conditions. The innovative carbon credit system channels 80% of the credit value directly to farmers, creating multiple income streams and reducing financial risk.
      `,
      chapters: [
        { 
          title: 'Unlocking New Income Streams: Agroforestry and Carbon Markets Arrive in Eastern Kenya', 
          content: `
            <h2>Unlocking New Income Streams: Agroforestry and Carbon Markets Arrive in Eastern Kenya</h2>
            
            <p><strong>Nairobi, Kenya –</strong> A groundbreaking initiative is taking root in eastern Kenya, promising a dual benefit of climate action and financial empowerment for smallholder farmers. Since 2020, Farm Africa, in collaboration with AGRA, has been spearheading an agroforestry project that ingeniously integrates carbon-based incentives with sustainable agricultural practices. The heart of this programme lies in the ACORN/Rabobank partnership, allowing farmers to earn additional income by planting trees and, crucially, monetising the carbon these trees store by selling Carbon Removal Units (CRUs) – each representing one tonne of carbon removed. These CRUs are then sold to corporations to offset their emissions, turning environmental stewardship into a tangible economic asset.</p>
            
            <p>This pioneering project isn't happening in a vacuum; it aligns perfectly with Kenya's ambitious stride towards climate leadership. The nation has emerged as a powerhouse for climate action in Africa, having issued approximately 52.4 million carbon credits by 2023 through both its Clean Development Mechanism (CDM) and Voluntary Carbon Market (VCM) initiatives. With a bold pledge to reduce greenhouse gas emissions by 32% by 2030 and supported by forward-thinking policies like the Climate Change Act of 2016 and 2024 carbon market regulations, Kenya is setting the stage for such transformative projects. This initiative champions climate justice, particularly focusing on the often-vulnerable smallholder farmers grappling with declining productivity and limited financial means.</p>
          `,
          pageNumber: 1 
        },
        { 
          title: 'A Growing Success Story: Scale, Impact, and Community-Led Governance', 
          content: `
            <h2>A Growing Success Story: Scale, Impact, and Community-Led Governance</h2>
            
            <p>The numbers are in, and they paint a compelling picture of success for the agroforestry project in eastern Kenya. By the close of 2023, the initiative had already successfully enrolled an impressive 21,658 farmers, transforming 14,175 hectares of land through tree planting. More importantly, 7,375 farmers have already reaped the financial rewards, selling 24,945 Carbon Removal Units (CRUs) and receiving payments in cash and in-kind seedlings. These efforts have led to a verifiable 24,945 tCO2e in emission reductions, a significant step towards climate mitigation.</p>
            
            <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
              <p class="text-green-800"><strong>Project Impact by Numbers (2023):</strong></p>
              <ul class="list-disc pl-6 mt-2 space-y-1">
                <li>21,658 farmers enrolled</li>
                <li>14,175 hectares transformed</li>
                <li>7,375 farmers received payments</li>
                <li>24,945 Carbon Removal Units sold</li>
                <li>24,945 tCO2e emission reductions verified</li>
              </ul>
            </div>
            
            <p>This success is underpinned by a robust, multi-stakeholder governance model that ensures local communities are at the very heart of decision-making. Representatives from Farm Africa's Village-Based Advisors (VBAs), local farmers, county governments, the Kenya Forestry Service, the Department of Environment, and KALRO all contribute to a structure that fosters strong community engagement and oversight. It's a testament to the power of collective action and shared responsibility.</p>
          `,
          pageNumber: 2 
        },
        { 
          title: 'Green Landscapes, Greener Earth: The Sustainable Agroforestry Blueprint', 
          content: `
            <h2>Green Landscapes, Greener Earth: The Sustainable Agroforestry Blueprint</h2>
            
            <p>At the core of this project lies a profound environmental transformation through sustainable agroforestry. It's more than just planting trees; it's about creating integrated systems where trees and crops coexist for mutual benefit, leading to comprehensive climate change mitigation. The project meticulously employs afforestation and reforestation practices, strategically selecting diverse tree species – both native and economically valuable – for their optimal carbon sequestration capabilities and local adaptability.</p>
            
            <p><strong>The reported environmental improvements are truly encouraging:</strong></p>
            
            <ul class="list-disc pl-6 space-y-2 my-4">
              <li><strong>Enhanced soil fertility</strong> is a key outcome, attributed to the rich leaf litter, extensive root systems, and nitrogen-fixing properties of the trees.</li>
              <li><strong>Farmers in Embu and Tharaka Nithi counties</strong> are reporting a remarkable 30-50% increase in soil organic matter and a 30-50% improvement in water retention, making farms more resilient to drought.</li>
              <li><strong>Increased biodiversity</strong> is evident, supporting local wildlife, maintaining ecological balance, and even reducing the need for chemical pesticides through natural pest control.</li>
              <li><strong>The newly established tree cover</strong> is creating improved microclimate conditions, moderating temperatures, reducing wind erosion, and enhancing humidity, all of which benefit crop and livestock production.</li>
              <li><strong>Better water infiltration</strong>, reduced runoff, and recharged groundwater are leading to increased water availability for agriculture, a crucial factor in these regions.</li>
            </ul>
            
            <p>By encouraging a shift from traditional monoculture to diversified agroforestry, farmers are receiving a variety of seedlings, including income-generating fruit trees (avocado, mango), nitrogen-fixing species (Calliandra calothyrsus, Gliricidia sepium), and valuable timber species (Grevillea robusta). This integrated approach is not just sequestering carbon; it's revitalising entire ecosystems.</p>
          `,
          pageNumber: 3 
        },
        { 
          title: 'Beyond Carbon: A Catalyst for Economic and Social Upliftment', 
          content: `
            <h2>Beyond Carbon: A Catalyst for Economic and Social Upliftment</h2>
            
            <p>The impact of eastern Kenya's agroforestry project stretches far beyond environmental gains, acting as a powerful catalyst for significant social and economic transformation within participating communities. The most striking feature? The innovative carbon credit system, which channels a substantial 80% of the credit value directly to the farmers. This supplementary income isn't just pocket money; it's empowering farmers to invest in crucial farm improvements, education, and essential inputs like seedlings and organic fertiliser, kickstarting a virtuous cycle of economic growth and enhanced financial security.</p>
            
            <p><strong>Consider the tangible outcomes:</strong></p>
            
            <ul class="list-disc pl-6 space-y-2 my-4">
              <li><strong>Farmers are experiencing increased disposable income</strong> and reduced input costs, directly improving their financial and food security. For instance, Rosebeth Karauki proudly reports a jump in her bean yield from 20kg to 88kg and maize production from eight bags to 18 bags per acre.</li>
              <li><strong>The project is a true job creation engine</strong>, particularly through the establishment of tree nurseries. Simon Mwangangi's Vuma Tree Nursery, a standout example, grew from 5,000 to an impressive 130,000 seedlings in just seven months and now provides stable employment for six full-time workers, offering vital sustainable job prospects for local youth.</li>
              <li><strong>Women's empowerment is a key outcome</strong>, with 69% of women practising agroforestry in Embu and 47% in Tharaka Nithi. This enables them to generate income from diverse sources like fruit sales and carbon credits, leading to increased participation in community decision-making and a stronger voice.</li>
              <li><strong>Social cohesion is strengthening</strong> through group-based knowledge sharing, collective marketing, and mutual support, building more resilient communities.</li>
            </ul>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
              <p class="text-blue-800"><strong>Key Insight:</strong> The carbon credit system's 80% direct payment to farmers ensures that environmental stewardship directly translates to economic empowerment.</p>
            </div>
          `,
          pageNumber: 4 
        },
        { 
          title: 'Nurturing Growth: The Power of Capacity Building and Knowledge Transfer', 
          content: `
            <h2>Nurturing Growth: The Power of Capacity Building and Knowledge Transfer</h2>
            
            <p>A cornerstone of the project's success is its robust and far-reaching capacity-building programme. This isn't a one-size-fits-all approach; it's a sophisticated blend of traditional farming wisdom, cutting-edge agricultural science, and modern environmental conservation principles. The curriculum itself is a testament to collaboration, integrating invaluable input directly from farmers, local knowledge, and scientific expertise to ensure it's both relevant and practical.</p>
            
            <p>Central to this knowledge dissemination model are the dedicated Village-Based Advisors (VBAs). These local champions undergo intensive training in a wide array of areas, including advanced agroforestry techniques, sustainable agricultural practices, and the intricacies of carbon credit mechanisms. Once trained, they become the primary conduits of knowledge within their communities, undertaking vital mobilisation efforts and providing continuous, on-the-ground support to participating farmers.</p>
            
            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4">
              <p class="text-orange-800"><strong>Success Story:</strong> Rosebeth Karauki, a 42-year-old mother and VBA from Tharaka Nithi, exemplifies this impact. She has personally educated over 1,000 farmers on the benefits of integrating trees with crops, a role that has directly led many to receive carbon credits and motivated them to plant even more trees.</p>
            </div>
            
            <p>This model, leveraging local leadership and deep community understanding, is proving incredibly effective in fostering increased farmer participation, solidifying community ties, and driving the widespread adoption of sustainable practices. The VBA approach ensures that knowledge transfer is culturally appropriate, linguistically accessible, and practically relevant to local farming conditions.</p>
          `,
          pageNumber: 5 
        },
        { 
          title: 'Faces of Transformation: Inspiring Farmer Stories', 
          content: `
            <h2>Faces of Transformation: Inspiring Farmer Stories</h2>
            
            <p>The true measure of this project's success is best told through the stories of the individual farmers whose lives have been profoundly changed.</p>
            
            <h3>Peter Kabuthe - From Monocropper to Diversification Champion</h3>
            <p><strong>Peter Kabuthe, a 60-year-old farmer from Embu County,</strong> offers a powerful narrative of transformation. Once a monocropper, his six-acre farm now boasts a diverse array of tea, coffee, avocado, and macadamia trees. Through the ACORN project, he received 50 avocado seedlings, and now proudly cultivates 100, with plans for more. His enrolment in the carbon credits programme in 2023 yielded payments that allowed him to invest in organic fertiliser and cow feed, and even employ temporary workers, expanding his total workforce to 13 people. Peter now envisions increasing his macadamia harvest from six to ten tonnes, further boosting revenue and employment, and hopes to mentor young people in the art of agroforestry.</p>
            
            <h3>Rosebeth Karauki - Education and Empowerment Leader</h3>
            <p><strong>Rosebeth Karauki, a 42-year-old mother of four and Village-Based Advisor (VBA) from Tharaka Nithi County,</strong> is another beacon of change. Her engagement with ACORN in October 2022 saw her farming diversify to include maize, beans, a kitchen garden, chickens, and livestock. As a VBA, she has educated over 1,000 farmers on agroforestry, leading many to receive carbon credits and become motivated to plant more trees. The carbon credit payments have been life-changing, enabling her to pay school fees for her children and even purchase a laptop and phone for her daughter, solidifying her family's financial and food security.</p>
            
            <h3>Simon Mwangangi - Youth Innovation in Climate Action</h3>
            <p><strong>Simon Mwangangi, a 32-year-old computer scientist from Embu County,</strong> showcases the power of youth in climate action. Driven by passion, he founded Vuma Tree Nursery, which has rapidly grown from 5,000 to over 130,000 seedlings of 40 varieties in just seven months. His nursery now employs six full-time workers, expanding to over ten during peak times, offering sustainable job opportunities to young people. Simon prioritises fruit trees for their continuous benefits and long-term environmental impact, viewing his nursery as a platform for large-scale employment and climate combat.</p>
          `,
          pageNumber: 6 
        },
        { 
          title: 'Charting the Future: Lessons, Resilience, and a Replicable Model', 
          content: `
            <h2>Charting the Future: Lessons, Resilience, and a Replicable Model</h2>
            
            <p>The agroforestry project in eastern Kenya stands as a beacon, offering invaluable lessons on how to effectively merge climate action with sustainable development. Its journey highlights several critical takeaways that could inform similar initiatives globally:</p>
            
            <ul class="list-disc pl-6 space-y-2 my-4">
              <li><strong>Financial incentives are a potent motivator:</strong> The direct financial benefits provided by carbon credits, with a substantial 80% of the value going straight to farmers, are proving to be a powerful engine for the adoption and sustained practice of agroforestry.</li>
              <li><strong>Local leadership and knowledge transfer are highly effective:</strong> The Village-Based Advisor (VBA) model has been instrumental in ensuring sustainable knowledge dissemination, with figures like Rosebeth educating over a thousand farmers and demonstrating the amplifying effect of local champions.</li>
              <li><strong>Long-term commitment is non-negotiable:</strong> Agroforestry demands patience; initial investments may not yield immediate returns, but the long-term rewards – improved soil health, predictable carbon payments, and increased yields – undeniably justify the waiting period.</li>
              <li><strong>Diversification builds resilience:</strong> Farmers who have diversified their crops to include high-value options like tea, coffee, avocado, and macadamia alongside carbon credits have created multiple income streams, significantly reducing financial risk and bolstering farm resilience.</li>
              <li><strong>Engaging youth requires a modern approach:</strong> The project has successfully demonstrated that incorporating modern technologies and showcasing clear economic benefits can make agriculture an attractive and viable career path for younger generations, as exemplified by Simon Mwangangi's thriving tree nursery.</li>
            </ul>
            
            <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
              <p class="text-green-800"><strong>Future Vision:</strong> The resounding success achieved in Kenya powerfully demonstrates that agroforestry, thoughtfully supported by carbon finance and robust community engagement, offers a replicable and scalable model for addressing the urgent challenges of climate change while simultaneously fostering vital rural development in other regions across Africa and beyond.</p>
            </div>
            
            <p>This initiative represents more than just an agricultural transformation; it's a blueprint for climate-smart development that other regions can adapt and implement, creating a network of sustainable farming communities across the continent and beyond.</p>
          `,
          pageNumber: 7 
        }
      ],
      summary: 'A comprehensive seven-chapter analysis of how Farm Africa and AGRA\'s agroforestry project in eastern Kenya has enrolled 21,658 farmers, generated 24,945 tCO2e in verified emission reductions, and created new income streams through carbon credits while transforming agricultural practices and empowering rural communities.'
    },
    tags: ['agroforestry', 'carbon markets', 'sustainable agriculture', 'Kenya', 'climate change', 'farmer income', 'Farm Africa', 'AGRA'],
    isPopular: true,
    image: '/images/agroforestry-farmer.jpg'
  },

  // Digital Transformation Publication
  {
    id: 'digital-transformation-sugar-mills',
    title: 'Digital Transformation in Sugar Mills',
    type: 'publication',
    author: 'Tech Institute',
    readTime: '20 min',
    savedDate: '2024-08-15',
    category: 'Technology',
    description: 'A comprehensive guide on implementing digital solutions in sugar manufacturing processes, covering automation, data analytics, and IoT integration for improved efficiency and productivity.',
    content: {
      extractedText: `
        Digital Transformation in Sugar Mills
        
        The sugar industry is undergoing a significant digital transformation, with mills across Kenya adopting cutting-edge technologies to improve efficiency, reduce costs, and enhance product quality. This comprehensive guide explores the key digital solutions being implemented in modern sugar manufacturing processes.
        
        From automated cane weighing systems to real-time production monitoring, digital technologies are revolutionizing how sugar mills operate. The integration of Internet of Things (IoT) sensors, artificial intelligence, and data analytics is enabling unprecedented levels of operational visibility and control.
        
        Key areas of digital transformation include: automated process control systems, predictive maintenance using AI algorithms, real-time quality monitoring, supply chain optimization through digital platforms, and energy management systems for improved sustainability.
      `,
      chapters: [
        { 
          title: 'Introduction to Digital Sugar Manufacturing', 
          content: `
            <h2>Digital Transformation in Sugar Mills</h2>
            
            <p>The sugar industry is undergoing a significant digital transformation, with mills across Kenya adopting cutting-edge technologies to improve efficiency, reduce costs, and enhance product quality.</p>
            
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
              <p class="text-gray-700">From automated cane weighing systems to real-time production monitoring, digital technologies are revolutionizing how sugar mills operate.</p>
            </div>
            
            <h3>Key Digital Solutions:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>IoT Sensors:</strong> Real-time monitoring of equipment performance</li>
              <li><strong>AI Analytics:</strong> Predictive maintenance and quality control</li>
              <li><strong>Automation Systems:</strong> Streamlined production processes</li>
              <li><strong>Digital Platforms:</strong> Supply chain optimization</li>
            </ul>
          `,
          pageNumber: 1 
        },
        { 
          title: 'Implementation Strategy', 
          content: `
            <h2>Digital Implementation Roadmap</h2>
            
            <h3>Phase 1: Assessment and Planning</h3>
            <ul class="list-disc pl-6 space-y-1 mb-4">
              <li>Current state analysis of existing systems</li>
              <li>Identification of digital transformation opportunities</li>
              <li>ROI analysis and business case development</li>
            </ul>
            
            <h3>Phase 2: Core System Implementation</h3>
            <ul class="list-disc pl-6 space-y-1 mb-4">
              <li>Automated process control systems installation</li>
              <li>IoT sensor network deployment</li>
              <li>Data management platform setup</li>
            </ul>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <p class="text-green-800"><strong>Expected Benefits:</strong> 15-25% improvement in operational efficiency and 20-30% reduction in maintenance costs within the first year.</p>
            </div>
          `,
          pageNumber: 2 
        }
      ],
      summary: 'Comprehensive guide covering digital transformation strategies for sugar mills, including IoT integration, AI analytics, and automation systems to improve efficiency and reduce operational costs.'
    },
    tags: ['digital transformation', 'technology', 'automation', 'IoT', 'sugar mills', 'efficiency'],
    isPopular: false
  },

  // Sustainable Farming Report
  {
    id: 'sustainable-farming-practices',
    title: 'Sustainable Farming Practices for Sugarcane Production',
    type: 'report',
    author: 'Environmental Agency',
    readTime: '15 min',
    savedDate: '2024-08-14',
    category: 'Sustainability',
    description: 'Comprehensive report on sustainable agricultural practices for sugarcane cultivation, focusing on soil conservation, water management, and environmentally-friendly farming methods.',
    content: {
      extractedText: `
        Sustainable Farming Practices for Sugarcane Production
        
        This report examines sustainable agricultural practices specifically tailored for sugarcane production in Kenya. With increasing environmental concerns and the need for climate-smart agriculture, sustainable farming methods have become essential for long-term productivity and environmental conservation.
        
        The report covers key areas including soil health management, water conservation techniques, integrated pest management, crop rotation strategies, and the use of organic fertilizers. These practices not only benefit the environment but also improve long-term farm productivity and profitability.
        
        Case studies from successful farms demonstrate that sustainable practices can increase yields by 20-30% while reducing input costs and environmental impact. The adoption of these methods requires initial investment but provides significant returns through improved soil fertility and reduced dependency on external inputs.
      `,
      chapters: [
        { 
          title: 'Sustainable Agriculture Overview', 
          content: `
            <h2>Sustainable Farming Practices for Sugarcane Production</h2>
            
            <p>This report examines sustainable agricultural practices specifically tailored for sugarcane production in Kenya. With increasing environmental concerns and the need for climate-smart agriculture, sustainable farming methods have become essential for long-term productivity and environmental conservation.</p>
            
            <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
              <p class="text-gray-700">Case studies from successful farms demonstrate that sustainable practices can increase yields by <strong>20-30%</strong> while reducing input costs and environmental impact.</p>
            </div>
            
            <h3>Key Sustainable Practices:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Soil Health Management:</strong> Organic matter enhancement and pH optimization</li>
              <li><strong>Water Conservation:</strong> Drip irrigation and rainwater harvesting</li>
              <li><strong>Integrated Pest Management:</strong> Biological control and minimal chemical use</li>
              <li><strong>Crop Rotation:</strong> Legume integration for nitrogen fixation</li>
            </ul>
          `,
          pageNumber: 1 
        },
        { 
          title: 'Implementation and Benefits', 
          content: `
            <h2>Implementation Strategy and Expected Benefits</h2>
            
            <h3>Implementation Timeline:</h3>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
              <ul class="list-disc pl-6 space-y-1">
                <li><strong>Year 1:</strong> Soil testing and organic matter incorporation</li>
                <li><strong>Year 2:</strong> Water management system installation</li>
                <li><strong>Year 3:</strong> Full sustainable practice integration</li>
              </ul>
            </div>
            
            <h3>Economic Benefits:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>20-30% increase in yields after full implementation</li>
              <li>25% reduction in fertilizer costs through organic methods</li>
              <li>40% decrease in pesticide expenses via IPM</li>
              <li>Improved soil fertility for long-term productivity</li>
            </ul>
            
            <p class="mt-4">The adoption of these methods requires initial investment but provides significant returns through improved soil fertility and reduced dependency on external inputs.</p>
          `,
          pageNumber: 2 
        }
      ],
      summary: 'Report demonstrating that sustainable sugarcane farming practices can increase yields by 20-30% while reducing costs and environmental impact through soil conservation, water management, and integrated pest management.'
    },
    tags: ['sustainable farming', 'agriculture', 'soil conservation', 'water management', 'sugarcane', 'environment'],
    isPopular: false
  },

  // Climate Smart Agriculture Case Study
  {
    id: 'climate-smart-agriculture-case-study',
    title: 'Climate-Smart Agriculture: Butali Sugar Success Story',
    type: 'case-study',
    author: 'Climate Research Institute',
    readTime: '12 min',
    savedDate: '2024-08-10',
    category: 'Sustainability',
    description: 'A detailed case study examining how Butali Sugar Company successfully implemented climate-smart agriculture practices, resulting in improved resilience, productivity, and environmental sustainability.',
    content: {
      extractedText: `
        Climate-Smart Agriculture: Butali Sugar Success Story
        
        This case study examines the successful implementation of climate-smart agriculture (CSA) practices at Butali Sugar Company, demonstrating how innovative farming techniques can build resilience against climate change while improving productivity and sustainability.
        
        Butali Sugar Company, located in Kakamega County, has become a model for climate-smart agriculture in Kenya's sugar sector. Through the adoption of drought-resistant sugarcane varieties, precision irrigation systems, and integrated crop management practices, the company has achieved remarkable results in both productivity and environmental stewardship.
        
        Key achievements include a 40% increase in water use efficiency, 25% improvement in cane yields, and 30% reduction in greenhouse gas emissions. The success has been attributed to comprehensive farmer training programs, strategic partnerships with research institutions, and significant investment in modern agricultural technologies.
      `,
      chapters: [
        { 
          title: 'Background and Challenge', 
          content: `
            <h2>Climate-Smart Agriculture: Butali Sugar Success Story</h2>
            
            <p>This case study examines the successful implementation of climate-smart agriculture (CSA) practices at Butali Sugar Company, demonstrating how innovative farming techniques can build resilience against climate change while improving productivity and sustainability.</p>
            
            <div class="bg-orange-50 border-l-4 border-orange-400 p-4 my-4">
              <p class="text-gray-700"><strong>Challenge:</strong> Butali Sugar Company faced increasing climate variability, including irregular rainfall patterns and prolonged dry seasons, which threatened both productivity and farmer livelihoods.</p>
            </div>
            
            <h3>Climate-Smart Solutions Implemented:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>Drought-resistant varieties:</strong> Introduction of climate-adapted sugarcane cultivars</li>
              <li><strong>Precision irrigation:</strong> Water-efficient drip irrigation systems</li>
              <li><strong>Soil conservation:</strong> Contour farming and cover cropping</li>
              <li><strong>Digital monitoring:</strong> Weather stations and crop monitoring systems</li>
            </ul>
          `,
          pageNumber: 1 
        },
        { 
          title: 'Results and Impact', 
          content: `
            <h2>Measurable Results and Long-term Impact</h2>
            
            <h3>Key Achievements:</h3>
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <ul class="list-disc pl-6 space-y-1">
                <li><strong>40% increase</strong> in water use efficiency</li>
                <li><strong>25% improvement</strong> in cane yields</li>
                <li><strong>30% reduction</strong> in greenhouse gas emissions</li>
                <li><strong>50% decrease</strong> in crop losses due to climate stress</li>
              </ul>
            </div>
            
            <h3>Success Factors:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Comprehensive farmer training programs on CSA practices</li>
              <li>Strategic partnerships with Kenya Agricultural and Livestock Research Organization (KALRO)</li>
              <li>Investment in modern agricultural technologies and equipment</li>
              <li>Strong community engagement and stakeholder participation</li>
            </ul>
            
            <p class="mt-4">The success has been attributed to a holistic approach that combines technological innovation with capacity building and community engagement.</p>
          `,
          pageNumber: 2 
        }
      ],
      summary: 'Case study showing how Butali Sugar Company achieved 40% increase in water efficiency, 25% yield improvement, and 30% emission reduction through climate-smart agriculture implementation.'
    },
    tags: ['climate-smart agriculture', 'case study', 'sustainability', 'Butali Sugar', 'climate resilience', 'productivity'],
    isPopular: false
  },

  // Market Analysis Report
  {
    id: 'sugar-market-analysis-2024',
    title: 'Kenya Sugar Market Analysis 2024',
    type: 'report',
    author: 'Market Research Division',
    readTime: '22 min',
    savedDate: '2024-08-05',
    category: 'Finance',
    description: 'Comprehensive analysis of Kenya\'s sugar market dynamics, including production trends, consumption patterns, import-export statistics, and price volatility factors affecting the industry.',
    content: {
      extractedText: `
        Kenya Sugar Market Analysis 2024
        
        This comprehensive market analysis examines the current state and future prospects of Kenya's sugar industry. The report covers production trends, consumption patterns, trade dynamics, and key market drivers affecting the sector in 2024.
        
        Kenya's sugar industry continues to face significant challenges, with domestic production meeting only 70% of national demand. This production deficit has led to increased reliance on imports, primarily from COMESA region countries. The analysis reveals critical insights into price volatility, market competition, and opportunities for industry growth.
        
        Key findings include: national sugar consumption of 1.14 million MT in 2024, domestic production of 815,454 MT creating a 30% deficit, average sugar prices fluctuating between KSh 140-180 per kg, and significant potential for import substitution through increased local production efficiency.
      `,
      chapters: [
        { 
          title: 'Market Overview and Key Statistics', 
          content: `
            <h2>Kenya Sugar Market Analysis 2024</h2>
            
            <p>This comprehensive market analysis examines the current state and future prospects of Kenya's sugar industry, covering production trends, consumption patterns, trade dynamics, and key market drivers affecting the sector in 2024.</p>
            
            <div class="bg-red-50 border-l-4 border-red-400 p-4 my-4">
              <p class="text-gray-700"><strong>Key Challenge:</strong> Kenya's sugar industry faces a significant production deficit, with domestic production meeting only <strong>70%</strong> of national demand.</p>
            </div>
            
            <h3>Market Statistics 2024:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><strong>National Consumption:</strong> 1.14 million MT</li>
              <li><strong>Domestic Production:</strong> 815,454 MT</li>
              <li><strong>Production Deficit:</strong> 30% (324,546 MT)</li>
              <li><strong>Price Range:</strong> KSh 140-180 per kg</li>
              <li><strong>Active Mills:</strong> 15 out of 17 licensed</li>
            </ul>
          `,
          pageNumber: 1 
        },
        { 
          title: 'Trade Dynamics and Future Outlook', 
          content: `
            <h2>Import-Export Patterns and Market Projections</h2>
            
            <h3>Import Dependencies:</h3>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
              <ul class="list-disc pl-6 space-y-1">
                <li><strong>Primary Sources:</strong> COMESA region countries (85% of imports)</li>
                <li><strong>Secondary Sources:</strong> Brazil, Thailand, and India</li>
                <li><strong>Import Volume:</strong> Approximately 325,000 MT annually</li>
                <li><strong>Import Value:</strong> US$ 150-200 million per year</li>
              </ul>
            </div>
            
            <h3>Growth Opportunities:</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li>Potential for 40% increase in domestic production through efficiency improvements</li>
              <li>Value addition opportunities in ethanol and bio-energy production</li>
              <li>Export potential to regional markets with quality improvements</li>
              <li>Private sector investment in modernization and expansion</li>
            </ul>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <p class="text-green-800"><strong>Projection:</strong> With strategic investments and policy support, Kenya could achieve sugar self-sufficiency by 2030 and potentially become a net exporter by 2035.</p>
            </div>
          `,
          pageNumber: 2 
        }
      ],
      summary: 'Market analysis revealing Kenya\'s 30% sugar production deficit (324,546 MT annually) and opportunities for achieving self-sufficiency through efficiency improvements and strategic investments by 2030.'
    },
    tags: ['market analysis', 'sugar industry', 'trade', 'economics', 'production', 'imports'],
    isPopular: false
  }
]

// Utility functions for working with resource data
export const getResourcesByType = (type: ResourceDocument['type']): ResourceDocument[] => {
  return resourceCenterData.filter(resource => resource.type === type)
}

export const getResourcesByCategory = (category: string): ResourceDocument[] => {
  return resourceCenterData.filter(resource => resource.category === category)
}

export const getPopularResources = (): ResourceDocument[] => {
  return resourceCenterData.filter(resource => resource.isPopular === true)
}

export const searchResources = (query: string): ResourceDocument[] => {
  const lowerQuery = query.toLowerCase()
  return resourceCenterData.filter(resource => 
    resource.title.toLowerCase().includes(lowerQuery) ||
    resource.description.toLowerCase().includes(lowerQuery) ||
    resource.category.toLowerCase().includes(lowerQuery) ||
    resource.content.extractedText.toLowerCase().includes(lowerQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export const getResourceById = (id: string): ResourceDocument | undefined => {
  return resourceCenterData.find(resource => resource.id === id)
}

export const getResourceCounts = () => {
  const counts = {
    article: 0,
    doc: 0,
    publication: 0,
    report: 0,
    'case-study': 0
  }
  
  resourceCenterData.forEach(resource => {
    counts[resource.type]++
  })
  
  return counts
}
