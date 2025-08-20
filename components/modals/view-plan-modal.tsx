"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Target, TrendingUp, Calendar, Users, CheckCircle, AlertTriangle, Clock, Award, Factory, Shield, Leaf, ChevronDown, ChevronRight } from "lucide-react"

interface ViewPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ViewPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const kraData = [
  {
    id: 1,
    title: "Production & Productivity",
    description: "Enhance sugarcane production efficiency and productivity through improved practices, cost reduction, variety adoption, and quality control systems",
    icon: Factory,
    color: "green",
    progress: 58,
    status: "on_track",
    targetDate: "End of plan (Y5 - 2029)",
    objectives: [
      {
        id: 1,
        title: "Improve average sugarcane yield from 61 TCH to 80 TCH",
        description: "Enhance sugarcane productivity through modern agronomic practices, farmer training, and improved inputs",
        progress: 68,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 1,
            name: "Promote modern agronomic practices",
            description: "Implementation of best practices for sugarcane cultivation",
            status: "in_progress",
            completion: 70,
            kpi: {
              name: "Average cane yield (TCH)",
              baseline: "61 TCH",
              target: "80 TCH",
              current: "69 TCH",
              progress: 42,
              yearlyTargets: { Y1: "65", Y2: "69", Y3: "73", Y4: "77", Y5: "80" }
            }
          },
          {
            id: 2,
            name: "Train farmers on soil health & fertility",
            description: "Comprehensive training programs on soil management and fertility improvement",
            status: "in_progress",
            completion: 50,
            kpi: {
              name: "% farmers trained",
              baseline: "0%",
              target: "80%",
              current: "40%",
              progress: 50,
              yearlyTargets: { Y1: "20%", Y2: "40%", Y3: "60%", Y4: "70%", Y5: "80%" }
            }
          },
          {
            id: 3,
            name: "Distribute improved farm inputs",
            description: "Provision of quality inputs and soil testing services to farmers",
            status: "in_progress",
            completion: 43,
            kpi: {
              name: "% farms with soil test reports",
              baseline: "0%",
              target: "70%",
              current: "30%",
              progress: 43,
              yearlyTargets: { Y1: "10%", Y2: "30%", Y3: "50%", Y4: "60%", Y5: "70%" }
            }
          }
        ]
      },
      {
        id: 2,
        title: "Reduce Cost of Production per Hectare by 20%",
        description: "Optimize production costs through bulk procurement, mechanization, and irrigation improvements",
        progress: 50,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 4,
            name: "Bulk procurement of inputs",
            description: "Collective purchasing strategies to reduce input costs for farmers",
            status: "in_progress",
            completion: 50,
            kpi: {
              name: "Average cost per hectare (% reduction)",
              baseline: "0%",
              target: "20% reduction",
              current: "10%",
              progress: 50,
              yearlyTargets: { Y1: "5%", Y2: "10%", Y3: "15%", Y4: "18%", Y5: "20%" }
            }
          },
          {
            id: 5,
            name: "Introduce mechanized planting & harvesting",
            description: "Modernization of farming equipment and mechanized practices",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "% farms mechanized",
              baseline: "TBD",
              target: "+25pp",
              current: "+10pp",
              progress: 40,
              yearlyTargets: { Y1: "+5pp", Y2: "+10pp", Y3: "+15pp", Y4: "+20pp", Y5: "+25pp" }
            }
          },
          {
            id: 6,
            name: "Optimize irrigation systems",
            description: "Efficient water management and irrigation infrastructure development",
            status: "in_progress",
            completion: 33,
            kpi: {
              name: "% irrigated farms",
              baseline: "TBD",
              target: "30%",
              current: "10%",
              progress: 33,
              yearlyTargets: { Y1: "5%", Y2: "10%", Y3: "15%", Y4: "20%", Y5: "30%" }
            }
          }
        ]
      },
      {
        id: 3,
        title: "Increase adoption of improved sugarcane varieties from 10% to 25%",
        description: "Promote adoption of high-yielding and disease-resistant sugarcane varieties",
        progress: 33,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 7,
            name: "Distribute certified improved seed cane",
            description: "Provision of quality planting materials to farmers",
            status: "in_progress",
            completion: 33,
            kpi: {
              name: "% area under improved varieties",
              baseline: "10%",
              target: "25%",
              current: "15%",
              progress: 33,
              yearlyTargets: { Y1: "12%", Y2: "15%", Y3: "18%", Y4: "21%", Y5: "25%" }
            }
          },
          {
            id: 8,
            name: "Partner with research institutions",
            description: "Collaboration for variety development and testing",
            status: "in_progress",
            completion: 67,
            kpi: {
              name: "No. of new varieties introduced",
              baseline: "0",
              target: "3",
              current: "2",
              progress: 67,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "0", Y5: "0" }
            }
          },
          {
            id: 9,
            name: "Conduct field demonstrations",
            description: "Demonstration plots to showcase improved varieties",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of demo plots",
              baseline: "0",
              target: "20",
              current: "8",
              progress: 40,
              yearlyTargets: { Y1: "4", Y2: "4", Y3: "4", Y4: "4", Y5: "4" }
            }
          }
        ]
      },
      {
        id: 4,
        title: "Operationalize Cane Testing Units (CTUs) by Dec 2027",
        description: "Establish and operationalize cane testing facilities for improved quality control",
        progress: 60,
        status: "on_track",
        targetDate: "Dec 2027 (Y3)",
        activities: [
          {
            id: 10,
            name: "Procure and install CTU equipment",
            description: "Acquisition and installation of specialized testing equipment",
            status: "in_progress",
            completion: 60,
            kpi: {
              name: "% CTUs operational",
              baseline: "0%",
              target: "100%",
              current: "60%",
              progress: 60,
              yearlyTargets: { Y1: "20%", Y2: "60%", Y3: "100%", Y4: "100%", Y5: "100%" }
            }
          },
          {
            id: 11,
            name: "Train CTU staff",
            description: "Capacity building for testing unit personnel",
            status: "in_progress",
            completion: 70,
            kpi: {
              name: "No. staff trained",
              baseline: "0",
              target: "50",
              current: "35",
              progress: 70,
              yearlyTargets: { Y1: "15", Y2: "20", Y3: "15", Y4: "0", Y5: "0" }
            }
          },
          {
            id: 12,
            name: "Develop CTU SOPs",
            description: "Standard operating procedures for quality testing operations",
            status: "completed",
            completion: 100,
            kpi: {
              name: "Approved SOPs (Yes/No)",
              baseline: "No",
              target: "Yes",
              current: "Yes",
              progress: 100,
              yearlyTargets: { Y1: "No", Y2: "Yes", Y3: "Yes", Y4: "Yes", Y5: "Yes" }
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Effective Regulation",
    description: "Create enabling legal frameworks, establish robust compliance systems, and strengthen quality assurance across the sugar industry",
    icon: Shield,
    color: "blue",
    progress: 72,
    status: "on_track",
    targetDate: "End of plan (Y5 - 2029)",
    objectives: [
      {
        id: 1,
        title: "Create an enabling legal & regulatory framework",
        description: "Review and update regulations, digitize licensing systems, and conduct stakeholder consultations",
        progress: 75,
        status: "on_track",
        targetDate: "Y3 (2027)",
        activities: [
          {
            id: 1,
            name: "Review & update sugar regulations",
            description: "Comprehensive review of pricing, quality, licensing, and traceability regulations",
            status: "in_progress",
            completion: 75,
            kpi: {
              name: "No. of regulations reviewed & updated",
              baseline: "0",
              target: "8",
              current: "4",
              progress: 50,
              yearlyTargets: { Y1: "2", Y2: "2", Y3: "2", Y4: "1", Y5: "1" }
            }
          },
          {
            id: 2,
            name: "Draft & submit amendments to Sugar Act 2024",
            description: "Preparation and submission of legislative amendments",
            status: "completed",
            completion: 100,
            kpi: {
              name: "Amendment proposals submitted (Yes/No)",
              baseline: "No",
              target: "Yes",
              current: "Yes",
              progress: 100,
              yearlyTargets: { Y1: "Yes", Y2: "-", Y3: "-", Y4: "-", Y5: "-" }
            }
          },
          {
            id: 3,
            name: "Conduct stakeholder consultations on reforms",
            description: "Engagement sessions with industry stakeholders on regulatory reforms",
            status: "in_progress",
            completion: 48,
            kpi: {
              name: "No. of consultations held",
              baseline: "0",
              target: "50",
              current: "24",
              progress: 48,
              yearlyTargets: { Y1: "12", Y2: "12", Y3: "10", Y4: "8", Y5: "8" }
            }
          },
          {
            id: 4,
            name: "Digitize licensing & regulatory framework",
            description: "Implementation of digital systems for licensing and regulatory processes",
            status: "in_progress",
            completion: 60,
            kpi: {
              name: "Digital licensing system operational (Yes/No)",
              baseline: "No",
              target: "Yes",
              current: "In Development",
              progress: 60,
              yearlyTargets: { Y1: "-", Y2: "Yes", Y3: "Yes", Y4: "", Y5: "" }
            }
          }
        ]
      },
      {
        id: 2,
        title: "Establish robust compliance & enforcement",
        description: "Implement comprehensive compliance monitoring and enforcement mechanisms",
        progress: 70,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 5,
            name: "Conduct annual compliance inspections",
            description: "Regular inspections of all licensed entities to ensure compliance",
            status: "in_progress",
            completion: 75,
            kpi: {
              name: "% coverage of licensed entities",
              baseline: "0%",
              target: "100%",
              current: "75%",
              progress: 75,
              yearlyTargets: { Y1: "60%", Y2: "75%", Y3: "85%", Y4: "95%", Y5: "100%" }
            }
          },
          {
            id: 6,
            name: "Enforce corrective action follow-up",
            description: "Monitor and ensure timely resolution of compliance issues",
            status: "in_progress",
            completion: 70,
            kpi: {
              name: "% of non-compliance resolved within 90 days",
              baseline: "0%",
              target: "90%",
              current: "70%",
              progress: 78,
              yearlyTargets: { Y1: "60%", Y2: "70%", Y3: "80%", Y4: "85%", Y5: "90%" }
            }
          },
          {
            id: 7,
            name: "Reduce licensing turnaround time",
            description: "Streamline processes to reduce license approval timeframes",
            status: "in_progress",
            completion: 62,
            kpi: {
              name: "Avg. license approval (days)",
              baseline: "30",
              target: "≤14",
              current: "25",
              progress: 31,
              yearlyTargets: { Y1: "30", Y2: "25", Y3: "20", Y4: "16", Y5: "14" }
            }
          },
          {
            id: 8,
            name: "Market surveillance inspections",
            description: "Regular market surveillance to ensure product quality and compliance",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of operations per year",
              baseline: "0",
              target: "60",
              current: "22",
              progress: 37,
              yearlyTargets: { Y1: "10", Y2: "12", Y3: "12", Y4: "12", Y5: "14" }
            }
          }
        ]
      },
      {
        id: 3,
        title: "Strengthen sugar quality assurance",
        description: "Implement comprehensive quality testing and traceability systems",
        progress: 68,
        status: "on_track",
        targetDate: "Y3 (2027)",
        activities: [
          {
            id: 9,
            name: "Conduct random market product testing",
            description: "Regular testing of sugar products in the market for quality compliance",
            status: "in_progress",
            completion: 60,
            kpi: {
              name: "% of samples passing tests",
              baseline: "88%",
              target: "≥95%",
              current: "90%",
              progress: 29,
              yearlyTargets: { Y1: "88%", Y2: "90%", Y3: "92%", Y4: "94%", Y5: "95%" }
            }
          },
          {
            id: 10,
            name: "Roll out industry traceability system",
            description: "Implementation of comprehensive traceability system across the industry",
            status: "in_progress",
            completion: 75,
            kpi: {
              name: "Traceability system functional (Yes/No)",
              baseline: "No",
              target: "Yes",
              current: "In Testing",
              progress: 75,
              yearlyTargets: { Y1: "-", Y2: "Yes", Y3: "Yes", Y4: "Yes", Y5: "Yes" }
            }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Industry Sustainability",
    description: "Mainstream ESG compliance, integrate gender & youth participation, strengthen labor rights, and implement sustainable practices with climate resilience",
    icon: Leaf,
    color: "emerald",
    progress: 45,
    status: "on_track",
    targetDate: "End of plan (Y5 - 2029)",
    objectives: [
      {
        id: 1,
        title: "Mainstream ESG compliance & sustainability",
        description: "Develop and implement comprehensive ESG frameworks and auditing systems",
        progress: 60,
        status: "on_track",
        targetDate: "Y2 (2025)",
        activities: [
          {
            id: 1,
            name: "Develop ESG compliance framework",
            description: "Creation of comprehensive ESG scorecard and compliance framework",
            status: "completed",
            completion: 100,
            kpi: {
              name: "ESG scorecard developed (Yes/No)",
              baseline: "No",
              target: "Yes",
              current: "Yes",
              progress: 100,
              yearlyTargets: { Y1: "Yes", Y2: "-", Y3: "-", Y4: "-", Y5: "-" }
            }
          },
          {
            id: 2,
            name: "Conduct ESG audits",
            description: "Regular auditing of ESG compliance across industry entities",
            status: "in_progress",
            completion: 25,
            kpi: {
              name: "No. of annual ESG audit reports",
              baseline: "0",
              target: "4",
              current: "1",
              progress: 25,
              yearlyTargets: { Y1: "-", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          },
          {
            id: 3,
            name: "Conduct ESG sensitization",
            description: "Awareness and training programs on ESG compliance for stakeholders",
            status: "in_progress",
            completion: 56,
            kpi: {
              name: "No. of sensitization forums",
              baseline: "0",
              target: "36",
              current: "20",
              progress: 56,
              yearlyTargets: { Y1: "20", Y2: "4", Y3: "4", Y4: "4", Y5: "4" }
            }
          }
        ]
      },
      {
        id: 2,
        title: "Integrate gender & youth in farming & agro-processing",
        description: "Promote inclusive participation of women and youth in the sugar value chain",
        progress: 40,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 4,
            name: "Conduct training programs for youth & women",
            description: "Capacity building programs targeting youth and women in sugar farming and processing",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of capacity-building programs",
              baseline: "0",
              target: "25",
              current: "10",
              progress: 40,
              yearlyTargets: { Y1: "5", Y2: "5", Y3: "5", Y4: "5", Y5: "5" }
            }
          }
        ]
      },
      {
        id: 3,
        title: "Strengthen labour rights, OHS & community engagement",
        description: "Implement industry codes of conduct and strengthen community engagement",
        progress: 50,
        status: "on_track",
        targetDate: "Y3 (2027)",
        activities: [
          {
            id: 5,
            name: "Adopt industry code of conduct",
            description: "Development and adoption of comprehensive industry code of conduct",
            status: "in_progress",
            completion: 75,
            kpi: {
              name: "Code of conduct adopted (Yes/No)",
              baseline: "No",
              target: "Yes",
              current: "In Review",
              progress: 75,
              yearlyTargets: { Y1: "-", Y2: "Yes", Y3: "-", Y4: "-", Y5: "-" }
            }
          },
          {
            id: 6,
            name: "Conduct code compliance audits",
            description: "Regular auditing of code of conduct compliance",
            status: "planning",
            completion: 0,
            kpi: {
              name: "No. of annual reports",
              baseline: "0",
              target: "4",
              current: "0",
              progress: 0,
              yearlyTargets: { Y1: "-", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          },
          {
            id: 7,
            name: "Roll out anti-child labour campaigns",
            description: "Awareness campaigns against child labor in sugar mill zones",
            status: "in_progress",
            completion: 77,
            kpi: {
              name: "No. of awareness campaigns in mill zones",
              baseline: "0",
              target: "26",
              current: "20",
              progress: 77,
              yearlyTargets: { Y1: "10", Y2: "4", Y3: "4", Y4: "4", Y5: "4" }
            }
          }
        ]
      },
      {
        id: 4,
        title: "Integrate sustainable practices & climate resilience",
        description: "Implement sustainability projects and establish climate change adaptation measures",
        progress: 30,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 8,
            name: "Implement sustainability projects",
            description: "Implementation of targeted sustainability initiatives across the industry",
            status: "in_progress",
            completion: 20,
            kpi: {
              name: "No. of projects implemented",
              baseline: "0",
              target: "5",
              current: "1",
              progress: 20,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          },
          {
            id: 9,
            name: "Conduct sustainability campaigns",
            description: "Awareness campaigns on sustainable practices across the industry",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of awareness campaigns",
              baseline: "0",
              target: "100",
              current: "40",
              progress: 40,
              yearlyTargets: { Y1: "20", Y2: "20", Y3: "20", Y4: "20", Y5: "20" }
            }
          },
          {
            id: 10,
            name: "Establish Climate Change Hub",
            description: "Creation of dedicated climate change coordination and response hub",
            status: "planning",
            completion: 0,
            kpi: {
              name: "Climate hub operational (Yes/No)",
              baseline: "NO",
              target: "YES",
              current: "NO",
              progress: 0,
              yearlyTargets: { Y1: "", Y2: "", Y3: "", Y4: "", Y5: "" }
            }
          },
          {
            id: 11,
            name: "Publish climate advisories",
            description: "Regular publication of climate-related advisories for the industry",
            status: "planning",
            completion: 0,
            kpi: {
              name: "No. of reports published",
              baseline: "0",
              target: "4",
              current: "0",
              progress: 0,
              yearlyTargets: { Y1: "-", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          }
        ]
      },
      {
        id: 5,
        title: "Sector-wide planning & value-chain financing",
        description: "Develop comprehensive industry planning and financing mechanisms",
        progress: 35,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 12,
            name: "Develop industry strategic plan",
            description: "Creation of comprehensive industry strategic development plan",
            status: "completed",
            completion: 100,
            kpi: {
              name: "Strategic plan developed (Yes/No)",
              baseline: "NO",
              target: "YES",
              current: "YES",
              progress: 100,
              yearlyTargets: { Y1: "YES", Y2: "-", Y3: "-", Y4: "-", Y5: "-" }
            }
          },
          {
            id: 13,
            name: "Conduct performance reviews",
            description: "Regular biannual performance reviews of industry progress",
            status: "planning",
            completion: 0,
            kpi: {
              name: "No. of biannual reviews",
              baseline: "0",
              target: "8",
              current: "0",
              progress: 0,
              yearlyTargets: { Y1: "-", Y2: "2", Y3: "2", Y4: "2", Y5: "2" }
            }
          },
          {
            id: 14,
            name: "Establish Stabilization Fund",
            description: "Creation and capitalization of industry stabilization fund",
            status: "in_progress",
            completion: 50,
            kpi: {
              name: "Fund capitalization (KES mn)",
              baseline: "0",
              target: "2000",
              current: "1000",
              progress: 50,
              yearlyTargets: { Y1: "500", Y2: "500", Y3: "500", Y4: "500", Y5: "500" }
            }
          },
          {
            id: 15,
            name: "Enroll smallholders in scheme",
            description: "Registration of smallholder farmers in stabilization scheme",
            status: "planning",
            completion: 0,
            kpi: {
              name: "% enrolled",
              baseline: "0%",
              target: "100%",
              current: "0%",
              progress: 0,
              yearlyTargets: { Y1: "0%", Y2: "20%", Y3: "40%", Y4: "40%", Y5: "100%" }
            }
          },
          {
            id: 16,
            name: "Develop bonus payment system",
            description: "Creation of performance-based bonus payment framework",
            status: "completed",
            completion: 100,
            kpi: {
              name: "Approved framework (Yes/No)",
              baseline: "NO",
              target: "YES",
              current: "YES",
              progress: 100,
              yearlyTargets: { Y1: "YES", Y2: "-", Y3: "-", Y4: "-", Y5: "-" }
            }
          },
          {
            id: 17,
            name: "Conduct lease compliance audits",
            description: "Regular auditing of land lease compliance",
            status: "in_progress",
            completion: 20,
            kpi: {
              name: "No. of annual audits",
              baseline: "0",
              target: "5",
              current: "1",
              progress: 20,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          },
          {
            id: 18,
            name: "Hold financial literacy forums",
            description: "Financial education programs for industry stakeholders",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of forums",
              baseline: "0",
              target: "20",
              current: "8",
              progress: 40,
              yearlyTargets: { Y1: "4", Y2: "4", Y3: "4", Y4: "4", Y5: "4" }
            }
          },
          {
            id: 19,
            name: "Roll out crop insurance",
            description: "Development and implementation of crop insurance products",
            status: "planning",
            completion: 0,
            kpi: {
              name: "No. of insurance products",
              baseline: "0",
              target: "3",
              current: "0",
              progress: 0,
              yearlyTargets: { Y1: "-", Y2: "1", Y3: "1", Y4: "1", Y5: "-" }
            }
          }
        ]
      }
    ]
  }
]

export function ViewPlanModal({ open, onOpenChange }: ViewPlanModalProps) {
  const [selectedKra, setSelectedKra] = useState(() => {
    if (kraData && kraData.length > 0) {
      return kraData[0]
    }
    return null
  })
  const [expandedKra, setExpandedKra] = useState(() => {
    if (kraData && kraData.length > 0) {
      return kraData[0].id
    }
    return null
  })
  const [selectedObjective, setSelectedObjective] = useState(() => {
    if (kraData?.[0]?.objectives && kraData[0].objectives.length > 0) {
      return kraData[0].objectives[0]
    }
    return null
  })
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  // Update selected objective when KRA changes
  const handleKraChange = (kra: any) => {
    setSelectedKra(kra)
    setExpandedKra(kra.id)
    if (kra?.objectives && kra.objectives.length > 0) {
      setSelectedObjective(kra.objectives[0])
    } else {
      setSelectedObjective(null)
    }
  }

  // Toggle KRA expansion
  const toggleKraExpansion = (kraId: number) => {
    if (expandedKra === kraId) {
      setExpandedKra(null)
    } else {
      const kra = kraData.find(k => k.id === kraId)
      if (kra) {
        setExpandedKra(kraId)
        setSelectedKra(kra)
        if (kra.objectives && kra.objectives.length > 0) {
          setSelectedObjective(kra.objectives[0])
        }
      }
    }
  }

  // Early return if no KRA or objective is selected
  if (!selectedKra || !selectedObjective) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Strategic Plan Not Available</DialogTitle>
            <DialogDescription>
              Unable to load strategic plan data. Please try again later.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "bg-green-100 text-green-800"
      case "at_risk":
        return "bg-yellow-100 text-yellow-800"
      case "behind":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track":
        return <CheckCircle className="h-4 w-4" />
      case "at_risk":
        return <AlertTriangle className="h-4 w-4" />
      case "behind":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <Award className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getInitiativeStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getKraColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: "text-green-600"
        }
      case "blue":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: "text-blue-600"
        }
      case "emerald":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-800",
          icon: "text-emerald-600"
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-800",
          icon: "text-gray-600"
        }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <selectedKra.icon className={`h-5 w-5 ${getKraColorClasses(selectedKra.color).icon}`} />
            KRA {selectedKra.id}: {selectedKra.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[75vh] gap-4">
          {/* Collapsible KRA Sidebar & Objectives List */}
          <div className="w-1/3 border-r pr-4">
            <h3 className="font-medium mb-4">Strategic Plan Overview</h3>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {kraData.map((kra) => {
                  const colors = getKraColorClasses(kra.color)
                  const IconComponent = kra.icon
                  const isExpanded = expandedKra === kra.id
                  const isSelected = selectedKra?.id === kra.id
                  
                  return (
                    <div key={kra.id} className="space-y-2">
                      {/* KRA Header - Collapsible */}
                      <Card
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? `${colors.border} ${colors.bg} shadow-md` 
                            : "hover:bg-gray-50 hover:shadow-sm"
                        }`}
                        onClick={() => toggleKraExpansion(kra.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500 transition-transform" />
                              )}
                            </div>
                            <IconComponent className={`h-5 w-5 ${colors.icon}`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">KRA {kra.id}: {kra.title}</h4>
                              </div>
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>Progress</span>
                                  <span>{kra.progress}%</span>
                                </div>
                                <Progress value={kra.progress} className="h-1.5" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Strategic Objectives - Collapsible Content */}
                      {isExpanded && (
                        <div className="ml-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {kra.objectives.map((objective: any) => (
                            <Card
                              key={objective.id}
                              className={`cursor-pointer transition-all duration-150 ${
                                selectedObjective?.id === objective.id 
                                  ? `${colors.border} ${colors.bg} shadow-sm` 
                                  : "hover:bg-gray-50 border-gray-200"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedObjective(objective)
                                setSelectedKra(kra)
                              }}
                            >
                              <CardContent className="p-3">
                                <div className="space-y-2">
                                  <div className="flex items-start justify-between">
                                    <h5 className="text-xs font-medium leading-tight">{objective.title}</h5>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">Progress</span>
                                      <span className="font-medium">{objective.progress}%</span>
                                    </div>
                                    <Progress value={objective.progress} className="h-1.5" />
                                    <div className="flex justify-between text-xs text-gray-500">
                                      <span>Target: {objective.targetDate}</span>
                                      <span>{objective.activities.length} activities</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Objective Details */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="h-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="kpis">KPIs</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="h-[calc(100%-4rem)] overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedObjective.title}</CardTitle>
                        <CardDescription className="mt-2">{selectedObjective.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(selectedObjective.status)}>
                        {getStatusIcon(selectedObjective.status)}
                        <span className="ml-1">{selectedObjective.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-6">
                        {/* Year-on-Year and 5-Year Progress Summary */}
                        <div className="p-4 bg-gray-50 rounded-lg border">
                          <h4 className="font-medium text-gray-800 mb-3">Strategic Progress Overview</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-white rounded-lg border">
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-800">Year 2 (Current)</span>
                              </div>
                              <p className="text-2xl font-bold text-gray-800">
                                {selectedObjective?.activities ? 
                                  Math.round(selectedObjective.activities.reduce((acc, activity) => {
                                    const currentVal = parseFloat(activity.kpi.current.replace(/[^\d.]/g, ''));
                                    const yearTargetVal = parseFloat(activity.kpi.yearlyTargets.Y2.replace(/[^\d.]/g, ''));
                                    return acc + Math.min(100, (currentVal / yearTargetVal) * 100);
                                  }, 0) / selectedObjective.activities.length) : 0}%
                              </p>
                              <p className="text-xs text-gray-600">Average Y2 Target Achievement</p>
                            </div>
                            
                            <div className="text-center p-3 bg-white rounded-lg border">
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-800">5-Year Plan</span>
                              </div>
                              <p className="text-2xl font-bold text-gray-800">
                                {selectedObjective?.activities ? 
                                  Math.round(selectedObjective.activities.reduce((acc, activity) => {
                                    const currentVal = parseFloat(activity.kpi.current.replace(/[^\d.]/g, ''));
                                    const baselineVal = parseFloat(activity.kpi.baseline.replace(/[^\d.]/g, ''));
                                    const finalTargetVal = parseFloat(activity.kpi.target.replace(/[^\d.]/g, ''));
                                    return acc + ((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100;
                                  }, 0) / selectedObjective.activities.length) : 0}%
                              </p>
                              <p className="text-xs text-gray-600">5-Year Plan Progress</p>
                            </div>
                            
                            <div className="text-center p-3 bg-white rounded-lg border">
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <Target className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-800">Completion Rate</span>
                              </div>
                              <p className="text-2xl font-bold text-gray-800">
                                {selectedObjective?.activities ? 
                                  `${selectedObjective.activities.filter(activity => {
                                    const currentVal = parseFloat(activity.kpi.current.replace(/[^\d.]/g, ''));
                                    const baselineVal = parseFloat(activity.kpi.baseline.replace(/[^\d.]/g, ''));
                                    const finalTargetVal = parseFloat(activity.kpi.target.replace(/[^\d.]/g, ''));
                                    const fiveYearProgress = ((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100;
                                    return fiveYearProgress >= 90;
                                  }).length}/${selectedObjective.activities.length}` : '0/0'}
                              </p>
                              <p className="text-xs text-gray-600">KPIs On Track</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className={`p-4 rounded-lg border ${
                            selectedObjective.progress >= 90 ? 'bg-green-50 border-green-200' :
                            selectedObjective.progress >= 70 ? 'bg-amber-50 border-amber-200' :
                            'bg-red-50 border-red-200'
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className={`h-5 w-5 ${
                                selectedObjective.progress >= 90 ? 'text-green-600' :
                                selectedObjective.progress >= 70 ? 'text-amber-600' :
                                'text-red-600'
                              }`} />
                              <span className="font-medium">Overall Progress</span>
                            </div>
                            <p className={`text-2xl font-bold ${
                              selectedObjective.progress >= 90 ? 'text-green-600' :
                              selectedObjective.progress >= 70 ? 'text-amber-600' :
                              'text-red-600'
                            }`}>{selectedObjective.progress}%</p>
                            <Progress value={selectedObjective.progress} className="mt-2" />
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="h-5 w-5 text-gray-600" />
                              <span className="font-medium">Target Date</span>
                            </div>
                            <p className="text-lg font-bold text-gray-800">{selectedObjective.targetDate}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-5 w-5 text-gray-600" />
                              <span className="font-medium">Activities</span>
                            </div>
                            <p className="text-lg font-bold text-gray-800">{selectedObjective?.activities?.length || 0}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Key Performance Indicators Overview</h4>
                          <div className="space-y-3">
                            {selectedObjective?.activities?.map((activity, index) => {
                              const kpi = activity.kpi;
                              
                              // Calculate Year 2 specific progress vs Y2 target
                              const calculateCurrentYearProgress = (current: string, yearTarget: string) => {
                                const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                                const yearTargetVal = parseFloat(yearTarget.replace(/[^\d.]/g, ''));
                                return Math.min(100, Math.round((currentVal / yearTargetVal) * 100));
                              };

                              // Calculate 5-year overall progress
                              const calculateFiveYearProgress = (current: string, baseline: string, finalTarget: string) => {
                                const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                                const baselineVal = parseFloat(baseline.replace(/[^\d.]/g, ''));
                                const finalTargetVal = parseFloat(finalTarget.replace(/[^\d.]/g, ''));
                                return Math.round(((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100);
                              };

                              const currentYearProgress = calculateCurrentYearProgress(kpi.current, kpi.yearlyTargets.Y2);
                              const fiveYearProgress = calculateFiveYearProgress(kpi.current, kpi.baseline, kpi.target);

                              return (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                      <span className="font-medium text-sm">{kpi?.name || 'N/A'}</span>
                                      <div className="text-xs text-gray-500 mt-1">Activity: {activity.name}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className={`text-center p-2 rounded ${
                                      currentYearProgress >= 90 ? 'bg-green-100' :
                                      currentYearProgress >= 70 ? 'bg-amber-100' :
                                      'bg-red-100'
                                    }`}>
                                      <p className="text-xs text-gray-600">Year 2 Progress</p>
                                      <p className={`text-lg font-bold ${
                                        currentYearProgress >= 90 ? 'text-green-600' :
                                        currentYearProgress >= 70 ? 'text-amber-600' :
                                        'text-red-600'
                                      }`}>{currentYearProgress}%</p>
                                      <div className="mt-1">
                                        <Progress value={currentYearProgress} className="h-1" />
                                      </div>
                                    </div>
                                    <div className={`text-center p-2 rounded ${
                                      fiveYearProgress >= 90 ? 'bg-green-100' :
                                      fiveYearProgress >= 70 ? 'bg-amber-100' :
                                      'bg-red-100'
                                    }`}>
                                      <p className="text-xs text-gray-600">5-Year Progress</p>
                                      <p className={`text-lg font-bold ${
                                        fiveYearProgress >= 90 ? 'text-green-600' :
                                        fiveYearProgress >= 70 ? 'text-amber-600' :
                                        'text-red-600'
                                      }`}>{fiveYearProgress}%</p>
                                      <div className="mt-1">
                                        <Progress value={fiveYearProgress} className="h-1" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-between text-sm text-gray-600">
                                    <span>Current: {kpi?.current || 'N/A'}</span>
                                    <span>Target: {kpi?.target || 'N/A'}</span>
                                  </div>
                                </div>
                              );
                            }) || <div className="text-sm text-gray-500">No activities available</div>}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Recent Updates</h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">CTU SOPs Approved</p>
                                <p className="text-xs text-gray-600">
                                  Standard Operating Procedures for Cane Testing Units have been developed and approved
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Year 2 (2025)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Yield Improvement Progress</p>
                                <p className="text-xs text-gray-600">
                                  Sugarcane yield improved to 69 TCH in Year 2, showing steady progress toward 80 TCH target
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Year 2 (2025)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Farmer Training Expansion</p>
                                <p className="text-xs text-gray-600">
                                  40% of farmers have been trained on soil health & fertility management as of Year 2
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Ongoing</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kpis" className="h-[calc(100%-4rem)] overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>Key Performance Indicators</CardTitle>
                    <CardDescription>Detailed KPI tracking for {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-6">
                        {selectedObjective?.activities?.map((activity, index) => {
                          const kpi = activity.kpi;
                          
                          // Calculate Year 2 specific progress (how much of Y2 target achieved)
                          const calculateCurrentYearProgress = (current: string, yearTarget: string) => {
                            const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                            const yearTargetVal = parseFloat(yearTarget.replace(/[^\d.]/g, ''));
                            // Assuming we're at mid-year, so 50% through the year
                            return Math.min(100, Math.round((currentVal / yearTargetVal) * 100));
                          };

                          // Calculate 5-year overall progress (baseline to final target)
                          const calculateFiveYearProgress = (current: string, baseline: string, finalTarget: string) => {
                            const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                            const baselineVal = parseFloat(baseline.replace(/[^\d.]/g, ''));
                            const finalTargetVal = parseFloat(finalTarget.replace(/[^\d.]/g, ''));
                            return Math.round(((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100);
                          };

                          // Calculate yearly milestone progress (for timeline visualization)
                          const calculateMilestoneProgress = (yearTarget: string, baseline: string, finalTarget: string) => {
                            const yearTargetVal = parseFloat(yearTarget.replace(/[^\d.]/g, ''));
                            const baselineVal = parseFloat(baseline.replace(/[^\d.]/g, ''));
                            const finalTargetVal = parseFloat(finalTarget.replace(/[^\d.]/g, ''));
                            return Math.round(((yearTargetVal - baselineVal) / (finalTargetVal - baselineVal)) * 100);
                          };

                          // Calculate yearly completion percentages for timeline
                          const yearlyMilestones = {
                            Y1: calculateMilestoneProgress(kpi.yearlyTargets.Y1, kpi.baseline, kpi.target),
                            Y2: calculateMilestoneProgress(kpi.yearlyTargets.Y2, kpi.baseline, kpi.target),
                            Y3: calculateMilestoneProgress(kpi.yearlyTargets.Y3, kpi.baseline, kpi.target),
                            Y4: calculateMilestoneProgress(kpi.yearlyTargets.Y4, kpi.baseline, kpi.target),
                            Y5: calculateMilestoneProgress(kpi.yearlyTargets.Y5, kpi.baseline, kpi.target)
                          };

                          // Current year is Y2 (2025)
                          const currentYearProgress = calculateCurrentYearProgress(kpi.current, kpi.yearlyTargets.Y2);
                          const fiveYearProgress = calculateFiveYearProgress(kpi.current, kpi.baseline, kpi.target);

                          return (
                            <Card key={index} className={`border-l-4 ${
                              fiveYearProgress >= 90 ? 'border-l-green-500' :
                              fiveYearProgress >= 70 ? 'border-l-amber-500' :
                              'border-l-red-500'
                            }`}>
                              <CardHeader className="pb-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <CardTitle className="text-lg">{kpi.name}</CardTitle>
                                    <p className="text-sm text-gray-500">Activity: {activity.name}</p>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {/* Year on Year and 5-Year Progress Summary */}
                                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 mb-1">Year 2 (Current) Progress</p>
                                      <p className={`text-3xl font-bold ${
                                        currentYearProgress >= 90 ? 'text-green-600' :
                                        currentYearProgress >= 70 ? 'text-amber-600' :
                                        'text-red-600'
                                      }`}>{currentYearProgress}%</p>
                                      <p className="text-xs text-gray-500">Target: {kpi.yearlyTargets.Y2}</p>
                                      <div className="mt-2">
                                        <Progress value={currentYearProgress} className="h-2" />
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 mb-1">5-Year Plan Progress</p>
                                      <p className={`text-3xl font-bold ${
                                        fiveYearProgress >= 90 ? 'text-green-600' :
                                        fiveYearProgress >= 70 ? 'text-amber-600' :
                                        'text-red-600'
                                      }`}>{fiveYearProgress}%</p>
                                      <p className="text-xs text-gray-500">Final Target: {kpi.target}</p>
                                      <div className="mt-2">
                                        <Progress value={fiveYearProgress} className="h-2" />
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Progress to Target</span>
                                      <span>{kpi.progress}%</span>
                                    </div>
                                    <Progress value={kpi.progress} className="h-3" />
                                  </div>
                                  {kpi.yearlyTargets && (
                                    <div>
                                      <p className="text-sm font-medium text-gray-700 mb-3">Year-on-Year Targets & Completion</p>
                                      <div className="grid grid-cols-5 gap-3">
                                        {(['Y1', 'Y2', 'Y3', 'Y4', 'Y5'] as const).map((year, yearIndex) => {
                                          const isCurrentYear = year === 'Y2';
                                          const isCompleted = year === 'Y1';
                                          const isFutureYear = ['Y3', 'Y4', 'Y5'].includes(year);
                                          const milestoneProgress = yearlyMilestones[year];
                                          
                                          // For current year, show actual progress vs target
                                          const displayProgress = isCurrentYear ? currentYearProgress : 
                                                                 isCompleted ? 100 : 
                                                                 milestoneProgress;
                                          
                                          return (
                                            <div key={year} className={`p-3 rounded-lg border-2 text-center ${
                                              isCompleted ? 'bg-green-100 border-green-300' :
                                              isCurrentYear ? 'bg-blue-100 border-blue-300' : 
                                              isFutureYear ? 'bg-gray-50 border-gray-200' :
                                              'bg-gray-50 border-gray-200'
                                            }`}>
                                              <p className="font-medium text-sm">{year}</p>
                                              <p className="text-lg font-bold mt-1">{kpi.yearlyTargets[year]}</p>
                                              
                                              {/* Progress percentage for each year */}
                                              <div className="mt-2">
                                                <p className={`text-xs font-medium ${
                                                  isCompleted ? 'text-green-700' :
                                                  isCurrentYear ? 'text-blue-700' :
                                                  'text-gray-600'
                                                }`}>
                                                  {isCompleted ? '✓ Achieved' : 
                                                   isCurrentYear ? `${displayProgress}% of Y2 Target` : 
                                                   isFutureYear ? 'Planned' : 'Milestone'}
                                                </p>
                                                
                                                {/* Progress bar for completed and current years */}
                                                {(isCompleted || isCurrentYear) && (
                                                  <div className="w-full bg-white rounded-full h-2 mt-1">
                                                    <div 
                                                      className={`h-2 rounded-full ${
                                                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                                      }`}
                                                      style={{ 
                                                        width: `${displayProgress}%` 
                                                      }}
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                              
                                              {/* Status indicator */}
                                              <div className={`w-2 h-2 rounded-full mx-auto mt-2 ${
                                                isCompleted ? 'bg-green-500' :
                                                isCurrentYear ? 'bg-blue-500' :
                                                'bg-gray-400'
                                              }`} />
                                            </div>
                                          );
                                        })}
                                      </div>
                                      
                                      {/* Year-on-Year Performance Summary */}
                                      <div className="mt-4 p-3 bg-white rounded-lg border">
                                        <h6 className="font-medium text-gray-700 mb-3">Performance Tracking Summary</h6>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                          <div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">Y1 Achievement:</span>
                                              <span className="font-medium text-green-600">✓ 100%</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">Y2 Progress vs Target:</span>
                                              <span className="font-medium text-blue-600">{currentYearProgress}%</span>
                                            </div>
                                          </div>
                                          <div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">5-Year Progress:</span>
                                              <span className="font-medium text-purple-600">{fiveYearProgress}%</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">Remaining to Final:</span>
                                              <span className="font-medium text-gray-600">{100 - fiveYearProgress}%</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activities" className="h-[calc(100%-4rem)] overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>Activities & KPIs</CardTitle>
                    <CardDescription>Activities and their corresponding KPIs for {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-4">
                        {selectedObjective?.activities?.map((activity, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-500">
                            <CardContent className="pt-4">
                              <div className="space-y-4">
                                {/* Activity Header */}
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-lg">{activity.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <Badge className={`${getInitiativeStatusColor(activity.status)}`}>
                                        {activity.status.replace("_", " ")}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="text-right ml-4">
                                    <p className="text-sm text-gray-600">Completion</p>
                                    <p className="text-2xl font-bold text-blue-600">{activity.completion}%</p>
                                  </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <Progress value={activity.completion} className="h-2" />
                                
                                {/* Associated KPI */}
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                  <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-gray-700">Key Performance Indicator</h5>
                                  </div>
                                  
                                  <h6 className="font-medium mb-2">{activity.kpi.name}</h6>
                                  
                                  <div className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Progress to Target</span>
                                      <span>{activity.kpi.progress}%</span>
                                    </div>
                                    <Progress value={activity.kpi.progress} className="h-2" />
                                  </div>
                                  
                                  {/* Yearly Targets */}
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Yearly Targets</p>
                                    <div className="grid grid-cols-5 gap-1 text-xs">
                                      <div className="text-center p-2 bg-white rounded border">
                                        <p className="font-medium">Y1</p>
                                        <p>{activity.kpi.yearlyTargets.Y1}</p>
                                      </div>
                                      <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                                        <p className="font-medium">Y2</p>
                                        <p>{activity.kpi.yearlyTargets.Y2}</p>
                                      </div>
                                      <div className="text-center p-2 bg-white rounded border">
                                        <p className="font-medium">Y3</p>
                                        <p>{activity.kpi.yearlyTargets.Y3}</p>
                                      </div>
                                      <div className="text-center p-2 bg-white rounded border">
                                        <p className="font-medium">Y4</p>
                                        <p>{activity.kpi.yearlyTargets.Y4}</p>
                                      </div>
                                      <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                                        <p className="font-medium">Y5</p>
                                        <p>{activity.kpi.yearlyTargets.Y5}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="h-[calc(100%-4rem)] overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle>Implementation Timeline</CardTitle>
                    <CardDescription>Activity milestones and KPI targets for {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="space-y-6">
                        {selectedObjective?.activities?.map((activity, activityIndex) => (
                          <div key={activityIndex} className="relative">
                            {/* Activity Timeline Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-l-blue-500">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-lg text-blue-800">{activity.name}</h4>
                                <Badge className={`${getInitiativeStatusColor(activity.status)}`}>
                                  {activity.status.replace("_", " ")}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                              
                              {/* Activity Progress */}
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex-1">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Activity Progress</span>
                                    <span>{activity.completion}%</span>
                                  </div>
                                  <Progress value={activity.completion} className="h-2" />
                                </div>
                              </div>
                            </div>
                            
                            {/* KPI Timeline */}
                            <div className="ml-6 mt-4 space-y-3">
                              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h5 className="font-medium text-green-800 mb-3">
                                  KPI: {activity.kpi.name}
                                </h5>
                                
                                {/* KPI 5-Year Timeline */}
                                <div className="grid grid-cols-5 gap-3">
                                  {(['Y1', 'Y2', 'Y3', 'Y4', 'Y5'] as const).map((year, yearIndex) => {
                                    const isCurrentYear = year === 'Y2';
                                    const isFinalYear = year === 'Y5';
                                    const isCompleted = yearIndex === 0; // Y1 is completed
                                    const target = activity.kpi.yearlyTargets[year];
                                    
                                    return (
                                      <div key={year} className="relative">
                                        {/* Timeline connector */}
                                        {yearIndex < 4 && (
                                          <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 z-0" />
                                        )}
                                        
                                        <div className={`relative z-10 p-3 rounded-lg border-2 text-center ${
                                          isCompleted ? 'bg-green-100 border-green-400' :
                                          isCurrentYear ? 'bg-blue-100 border-blue-400' : 
                                          isFinalYear ? 'bg-amber-100 border-amber-400' :
                                          'bg-gray-50 border-gray-300'
                                        }`}>
                                          {/* Timeline dot */}
                                          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                                            isCompleted ? 'bg-green-500' :
                                            isCurrentYear ? 'bg-blue-500' :
                                            isFinalYear ? 'bg-amber-500' :
                                            'bg-gray-400'
                                          }`} />
                                          
                                          <p className="font-medium text-sm">{year}</p>
                                          <p className="text-lg font-bold mt-1">{target}</p>
                                          <p className="text-xs text-gray-600 mt-1">
                                            {isCompleted ? 'Achieved' : 
                                             isCurrentYear ? 'Current Target' : 
                                             isFinalYear ? 'Final Goal' : 'Milestone'}
                                          </p>
                                          
                                          {isCurrentYear && (
                                            <div className="mt-2">
                                              <div className="text-xs text-blue-700">
                                                Progress: {activity.kpi.progress}%
                                              </div>
                                              <div className="w-full bg-white rounded-full h-1.5 mt-1">
                                                <div 
                                                  className="bg-blue-500 h-1.5 rounded-full" 
                                                  style={{ width: `${activity.kpi.progress}%` }}
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className={`${
            selectedKra.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
            selectedKra.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
            selectedKra.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
            'bg-gray-600 hover:bg-gray-700'
          }`}>
            Export Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
