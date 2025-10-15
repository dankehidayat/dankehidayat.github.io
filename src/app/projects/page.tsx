// app/projects/page.tsx
import {
  Code,
  Cpu,
  BookOpen,
  ExternalLink,
  Github,
  Wifi,
  Database,
  Smartphone,
  Globe,
  FileText,
  Recycle,
} from "lucide-react";

// Define TypeScript interfaces for better type safety
interface CalibrationData {
  temperature: string;
  humidity: string;
  mae: {
    temperature: string;
    humidity: string;
  };
}

interface SortingLogic {
  dry: string;
  wet: string;
  metal: string;
}

interface Specifications {
  detectionTime: string;
  sortingAccuracy: string;
  capacityMonitoring: string;
  connectivity: string;
}

interface IoTProject {
  title: string;
  description: string;
  technologies: string[];
  components: string[];
  githubUrl: string;
  demoUrl?: string;
  status: string;
  features: string[];
  calibration?: CalibrationData;
  sortingLogic?: SortingLogic;
  specifications?: Specifications;
}

interface SoftwareProject {
  title: string;
  description: string;
  techStack: {
    framework: string;
    language: string;
    styling: string;
    database: string;
    charts?: string;
    state?: string;
    deployment?: string;
  };
  githubUrl: string;
  liveUrl?: string;
  platform: string;
  status: string;
  features: string[];
}

interface ResearchProject {
  title: string;
  description: string;
  type: string;
  institution: string;
  year: string;
  technologies: string[];
  methodologies: string[];
  contributions: string[];
  category: string;
  documentUrl: string;
  scholarUrl: string;
}

const projects: {
  iot: IoTProject[];
  software: SoftwareProject[];
  research: ResearchProject[];
} = {
  iot: [
    {
      title: "EcoBin Sorter - Smart Waste Classification System",
      description:
        "An intelligent trash bin that automatically classifies and sorts waste into dry, wet, and metal categories using sensor technology and IoT capabilities. Features real-time trash level monitoring, automated sorting mechanisms, and WiFi connectivity for remote monitoring.",
      technologies: [
        "ESP32",
        "Arduino",
        "Servo Motors",
        "IR Sensors",
        "Water Detection",
        "Metal Detection",
        "Motor Driver",
        "LCD I2C",
        "WiFi Manager",
      ],
      components: [
        "ESP32 Development Board",
        "28BYJ-48 Stepper Motor",
        "SG90 Servo Motors",
        "HC-SR04 Ultrasonic Sensor",
        "Water/Moisture Sensor",
        "Metal Detection Sensor",
        "IR Proximity Sensors (x4)",
        "L298N Motor Driver",
        "20x4 I2C LCD Display",
        "12V DC Power Supply",
      ],
      githubUrl: "https://github.com/dankehidayat/ecobin-sorter",
      status: "Completed",
      features: [
        "Automatic Waste Classification (Dry/Wet/Metal)",
        "Real-time Trash Level Monitoring",
        "Servo-controlled Sorting Gates",
        "Conveyor Belt System with Stepper Motor",
        "Multi-sensor Fusion Technology",
        "WiFi Configuration Portal",
        "LCD Status Display",
        "Blynk IoT Platform Integration",
      ],
      sortingLogic: {
        dry: "Water Sensor HIGH + Metal Sensor HIGH",
        wet: "Water Sensor LOW",
        metal: "Metal Sensor LOW",
      },
      specifications: {
        detectionTime: "5 seconds analysis period",
        sortingAccuracy: ">90% classification rate",
        capacityMonitoring: "4x IR proximity sensors",
        connectivity: "WiFi with fallback AP mode",
      },
    },
    {
      title: "Office Energy and Environment Monitoring IoT System",
      description:
        "A comprehensive IoT monitoring system that tracks electrical energy consumption and environmental conditions using ESP32 microcontroller. Features advanced calibration algorithms for improved sensor accuracy with linear regression analysis.",
      technologies: [
        "ESP32",
        "Arduino",
        "PZEM-004T",
        "DHT11",
        "Blynk IoT",
        "LCD Display",
      ],
      components: [
        "ESP32 Development Board",
        "PZEM-004T Power Module",
        "DHT11 Sensor",
        "HTC-1 Reference",
        "16x2 I2C LCD",
      ],
      githubUrl: "https://github.com/dankehidayat/energy-temperature-monitor",
      demoUrl: "https://ipb.link/energy-temperature-monitoring-data",
      status: "Completed",
      features: [
        "Real-time Power Monitoring (Voltage, Current, Power, Energy)",
        "Environmental Sensing with HTC-1 Reference Calibration",
        "Linear Regression Analysis for Sensor Accuracy",
        "Blynk Platform Integration",
        "WiFi Manager for Easy Configuration",
        "LCD Display with Rotating Modes",
      ],
      calibration: {
        temperature: "HTC-1 = 0.845 × DHT11 + 0.642 (R² = 0.897)",
        humidity: "HTC-1 = 1.135 × DHT11 + 6.732 (R² = 0.823)",
        mae: {
          temperature: "0.42°C",
          humidity: "2.87%",
        },
      },
    },
  ],
  software: [
    {
      title: "FlowPoint - Energy & Temp Monitoring App",
      description:
        "A sophisticated Flutter-based mobile application for real-time energy monitoring and power quality analysis. Features Material You design, interactive charts, and comprehensive IoT sensor integration via Blynk server.",
      techStack: {
        framework: "Flutter 3.19",
        language: "Dart 3.3",
        styling: "Material You",
        database: "Blynk IoT Platform",
        charts: "FL Chart",
        state: "Provider",
      },
      githubUrl: "https://github.com/dankehidayat/FlowPoint",
      platform: "Mobile (Android)",
      status: "Completed",
      features: [
        "Real-time Dashboard with 3-second updates",
        "Power Quality Analysis (Active/Reactive/Apparent Power)",
        "Interactive Charts with FL Chart",
        "Material You Design System",
        "Dark/Light Theme Support",
        "Multi-sensor Data Visualization",
      ],
    },
    {
      title: "FlowPoint Next - Web Monitoring Dashboard",
      description:
        "A real-time energy monitoring dashboard built with Next.js and Prisma, featuring interactive charts, automatic data collection from Blynk IoT platform, and Vercel Postgres integration.",
      techStack: {
        framework: "Next.js 15",
        language: "TypeScript",
        styling: "Tailwind CSS",
        database: "Vercel Postgres",
        charts: "Recharts",
        deployment: "Vercel",
      },
      githubUrl: "https://github.com/dankehidayat/FlowPoint-Next",
      liveUrl: "https://flowpoint.dankehidayat.my.id",
      platform: "Web",
      status: "Completed",
      features: [
        "Real-time Energy Consumption Monitoring",
        "Interactive Charts with Recharts",
        "Automatic Data Collection from Blynk",
        "Vercel Postgres Database",
        "Responsive Dashboard Design",
        "Historical Data Visualization",
      ],
    },
  ],
  research: [
    {
      title:
        "Implementation of Mamdani Fuzzy Logic for Real-Time Monitoring of Electricity and Room Temperature Based on IoT",
      description:
        "Application of Mamdani fuzzy logic to analyze complex sensor data in order to improve the accuracy of energy inefficiency identification and provide optimization recommendations.",
      type: "Thesis",
      institution: "Vocational School of IPB University",
      year: "2025",
      technologies: [
        "Mamdani Fuzzy Logic",
        "IoT",
        "Real-time Monitoring",
        "Energy Efficiency",
        "Data Analysis",
      ],
      methodologies: [
        "Fuzzy Logic Implementation",
        "IoT Sensor Integration",
        "Real-time Data Processing",
        "Energy Optimization Analysis",
      ],
      contributions: [
        "Improved accuracy of energy inefficiency identification",
        "Real-time optimization recommendations",
        "Complex sensor data analysis using fuzzy logic",
        "IoT-based monitoring system integration",
      ],
      category: "ai-iot",
      documentUrl: "#",
      scholarUrl: "#",
    },
    {
      title:
        "Implementation of User Centered Design Method on CarbonArea Website User Experience",
      description:
        "This study applies a User-Centered Design (UCD) approach to design the UI/UX for CarbonArea, a website monitoring CO2's impact on food security. The process, informed by user interviews, successfully delivered an engaging interface with interactive, real-time data features.",
      type: "Journal",
      institution: "Vocational School of IPB University",
      year: "2025",
      technologies: [
        "User Centered Design",
        "UI/UX Design",
        "User Research",
        "Interactive Design",
        "Real-time Data",
      ],
      methodologies: [
        "User Interviews",
        "UCD Process",
        "Prototype Testing",
        "User Experience Evaluation",
      ],
      contributions: [
        "Engaging interface design for CO2 impact monitoring",
        "Interactive real-time data features",
        "User-centered approach to food security visualization",
        "Improved user engagement through UCD methodology",
      ],
      category: "ui-ux",
      documentUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/104",
      scholarUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/104",
    },
    {
      title:
        "Designing User Interface on 'HewanKu' Application Using User Centered Design Method",
      description:
        "This research designs the HewanKu livestock trading app's interface using User Centered Design (UCD) to enhance user experience. Combined with Black Box Testing, the method produced an intuitive, reliable, and user-trusted application for transactions.",
      type: "Journal",
      institution: "Vocational School of IPB University",
      year: "2025",
      technologies: [
        "User Centered Design",
        "Mobile UI Design",
        "Black Box Testing",
        "Livestock Trading",
        "E-commerce",
      ],
      methodologies: [
        "UCD Methodology",
        "Interface Design",
        "Black Box Testing",
        "User Trust Evaluation",
      ],
      contributions: [
        "Intuitive livestock trading application interface",
        "Reliable transaction system design",
        "User trust enhancement through UCD",
        "Comprehensive testing methodology",
      ],
      category: "ui-ux",
      documentUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/104",
      scholarUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/104",
    },
    {
      title:
        "Designing a Website-Based Inventory Information System at 'NeoSkin' Cosmetics Store Using User-Centered Design",
      description:
        "This research designs a web-based inventory system for NeoSkin cosmetics using a User Centered Design (UCD) approach. The system streamlines warehouse management and reporting, with functionality verified through Black Box Testing.",
      type: "Journal",
      institution: "Vocational School of IPB University",
      year: "2025",
      technologies: [
        "User Centered Design",
        "Inventory System",
        "Web Development",
        "Warehouse Management",
        "Black Box Testing",
      ],
      methodologies: [
        "UCD Approach",
        "System Design",
        "Functionality Testing",
        "Warehouse Optimization",
      ],
      contributions: [
        "Streamlined warehouse management system",
        "Improved inventory reporting",
        "User-centered design for operational efficiency",
        "Verified functionality through comprehensive testing",
      ],
      category: "system-design",
      documentUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/104",
      scholarUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/104",
    },
    {
      title: "Implementing Fuzzy Logic to Forecast Electricity Usage Costs",
      description:
        "This research develops a Mamdani fuzzy logic model using Matlab to predict household electricity costs. Analyzing variables like house size, appliance usage, and income, it accurately forecasts expenses, demonstrating an effective tool for managing energy consumption.",
      type: "Journal",
      institution: "Vocational School of IPB University",
      year: "2025",
      technologies: [
        "Mamdani Fuzzy Logic",
        "Matlab",
        "Cost Forecasting",
        "Energy Management",
        "Predictive Modeling",
      ],
      methodologies: [
        "Fuzzy Logic Modeling",
        "Variable Analysis",
        "Cost Prediction",
        "Energy Consumption Analysis",
      ],
      contributions: [
        "Accurate electricity cost forecasting",
        "Multi-variable analysis approach",
        "Effective energy management tool",
        "Practical application of fuzzy logic in cost prediction",
      ],
      category: "ai-iot",
      documentUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/49",
      scholarUrl:
        "https://batrisyaedu.com/journal/index.php/batrisya/article/view/49",
    },
  ],
};

// Category colors for badges
const categoryColors = {
  "ai-iot":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "ui-ux": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "system-design":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "data-science":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

// Category icons
const categoryIcons = {
  "ai-iot": Cpu,
  "ui-ux": Code,
  "system-design": Database,
  "data-science": BookOpen,
};

// Project Action Button Component
const ProjectActions = ({
  githubUrl,
  liveUrl,
  demoUrl,
  documentUrl,
  scholarUrl,
  type,
}: {
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  documentUrl?: string;
  scholarUrl?: string;
  type?: string;
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 project-btn-solid rounded-lg transition-colors text-sm font-domine w-full text-center"
        >
          <Github className="h-4 w-4" />
          Source Code
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 project-btn-outline rounded-lg transition-colors text-sm font-domine w-full text-center"
        >
          <ExternalLink className="h-4 w-4" />
          Live Demo
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 project-btn-outline rounded-lg transition-colors text-sm font-domine w-full text-center"
        >
          <ExternalLink className="h-4 w-4" />
          Live Data
        </a>
      )}
      {documentUrl && scholarUrl && scholarUrl !== "#" && (
        <a
          href={scholarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 project-btn-solid rounded-lg transition-colors text-sm font-domine w-full text-center"
        >
          <FileText className="h-4 w-4" />
          View {type === "Thesis" ? "Thesis" : "Publication"}
        </a>
      )}
      {documentUrl && (!scholarUrl || scholarUrl === "#") && (
        <a
          href={documentUrl}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 project-btn-solid rounded-lg transition-colors text-sm font-domine w-full text-center"
        >
          <FileText className="h-4 w-4" />
          View {type === "Thesis" ? "Thesis" : "Publication"}
        </a>
      )}
    </div>
  );
};

// Helper component for calibration section
const CalibrationSection = ({
  calibration,
}: {
  calibration: CalibrationData;
}) => (
  <div className="bg-muted rounded-lg p-4 mb-6">
    <h4 className="font-domine font-semibold mb-3">Calibration Results</h4>
    <div className="grid md:grid-cols-2 gap-4 text-sm">
      <div>
        <span className="font-medium">Temperature: </span>
        <code className="bg-background px-2 py-1 rounded text-xs">
          {calibration.temperature}
        </code>
      </div>
      <div>
        <span className="font-medium">Humidity: </span>
        <code className="bg-background px-2 py-1 rounded text-xs">
          {calibration.humidity}
        </code>
      </div>
      <div>
        <span className="font-medium">Temperature MAE: </span>
        <span className="text-green-600 font-medium">
          {calibration.mae.temperature}
        </span>
      </div>
      <div>
        <span className="font-medium">Humidity MAE: </span>
        <span className="text-green-600 font-medium">
          {calibration.mae.humidity}
        </span>
      </div>
    </div>
  </div>
);

// Helper component for EcoBin sections
const EcoBinSections = ({
  sortingLogic,
  specifications,
}: {
  sortingLogic: SortingLogic;
  specifications: Specifications;
}) => (
  <>
    {/* Sorting Logic */}
    <div className="bg-muted rounded-lg p-4 mb-6">
      <h4 className="font-domine font-semibold mb-3 flex items-center gap-2">
        Sorting Classification Logic
      </h4>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="font-semibold text-blue-600">Dry Trash</div>
          <code className="text-xs mt-1">{sortingLogic.dry}</code>
        </div>
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="font-semibold text-green-600">Wet Trash</div>
          <code className="text-xs mt-1">{sortingLogic.wet}</code>
        </div>
        <div className="text-center p-3 bg-background rounded-lg">
          <div className="font-semibold text-orange-600">Metal Trash</div>
          <code className="text-xs mt-1">{sortingLogic.metal}</code>
        </div>
      </div>
    </div>

    {/* Specifications */}
    <div className="bg-muted rounded-lg p-4 mb-6">
      <h4 className="font-domine font-semibold mb-3 flex items-center gap-2">
        System Specifications
      </h4>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Detection Time: </span>
          <span className="text-foreground">
            {specifications.detectionTime}
          </span>
        </div>
        <div>
          <span className="font-medium">Sorting Accuracy: </span>
          <span className="text-green-600 font-medium">
            {specifications.sortingAccuracy}
          </span>
        </div>
        <div>
          <span className="font-medium">Capacity Monitoring: </span>
          <span className="text-foreground">
            {specifications.capacityMonitoring}
          </span>
        </div>
        <div>
          <span className="font-medium">Connectivity: </span>
          <span className="text-foreground">{specifications.connectivity}</span>
        </div>
      </div>
    </div>
  </>
);

export default function Projects() {
  // Calculate total number of projects for animation delays
  const totalProjects =
    projects.iot.length + projects.software.length + projects.research.length;

  return (
    <div className="min-h-screen bg-background py-12 projects-page">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-6">Projects & Research</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A collection of my software development projects, IoT systems, and
            academic research focusing on smart waste management, energy
            monitoring, AI applications, user-centered design, and data
            analysis.
          </p>
        </div>

        {/* IoT Projects Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-heading">Internet of Things</h2>
          </div>

          <div className="grid gap-8">
            {projects.iot.map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 project-item"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-3/4">
                        {/* Header with badges */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-domine font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-3">
                              {project.title.includes("EcoBin") ? (
                                <Recycle className="h-4 w-4 mr-1" />
                              ) : (
                                <Wifi className="h-4 w-4 mr-1" />
                              )}
                              {project.title.includes("EcoBin")
                                ? "Smart Waste Management"
                                : "IoT System"}
                            </span>
                            <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                              {project.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Specialized Information Sections */}
                        {project.title.includes("EcoBin") &&
                        project.sortingLogic &&
                        project.specifications ? (
                          <EcoBinSections
                            sortingLogic={project.sortingLogic}
                            specifications={project.specifications}
                          />
                        ) : project.calibration ? (
                          <CalibrationSection
                            calibration={project.calibration}
                          />
                        ) : null}

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-domine font-semibold mb-3">
                            Key Features
                          </h4>
                          <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies & Components */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-domine font-semibold mb-3">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-domine"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-domine font-semibold mb-3">
                              Key Components
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.components
                                .slice(0, 6)
                                .map((component, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-background text-muted-foreground rounded-full text-xs font-domine"
                                  >
                                    {component}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="lg:w-1/4 flex lg:justify-end lg:items-start">
                        <ProjectActions
                          githubUrl={project.githubUrl}
                          demoUrl={project.demoUrl}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Software Projects Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-heading">Software Development</h2>
          </div>

          <div className="grid gap-6">
            {projects.software.map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 project-item"
                style={{
                  animationDelay: `${(projects.iot.length + index) * 0.1}s`,
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-3/4">
                    {/* Header with badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-domine font-medium ${
                          project.platform === "Mobile (Android)"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {project.platform === "Mobile (Android)" ? (
                          <Smartphone className="h-4 w-4 mr-1" />
                        ) : (
                          <Globe className="h-4 w-4 mr-1" />
                        )}
                        {project.platform}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <h4 className="font-domine font-semibold mb-3 text-sm">
                        Tech Stack
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Framework:</span>{" "}
                          {project.techStack.framework}
                        </div>
                        <div>
                          <span className="font-medium">Language:</span>{" "}
                          {project.techStack.language}
                        </div>
                        <div>
                          <span className="font-medium">Styling:</span>{" "}
                          {project.techStack.styling}
                        </div>
                        <div>
                          <span className="font-medium">Database:</span>{" "}
                          {project.techStack.database}
                        </div>
                        {project.techStack.charts && (
                          <div>
                            <span className="font-medium">Charts:</span>{" "}
                            {project.techStack.charts}
                          </div>
                        )}
                        {project.techStack.state && (
                          <div>
                            <span className="font-medium">State:</span>{" "}
                            {project.techStack.state}
                          </div>
                        )}
                        {project.techStack.deployment && (
                          <div>
                            <span className="font-medium">Deployment:</span>{" "}
                            {project.techStack.deployment}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-domine font-semibold mb-2 text-sm">
                        Features
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {project.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="lg:w-1/4 flex lg:justify-end lg:items-start">
                    <ProjectActions
                      githubUrl={project.githubUrl}
                      liveUrl={project.liveUrl}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-heading">Research & Publications</h2>
          </div>

          <div className="grid gap-6">
            {projects.research.map((research, index) => {
              const CategoryIcon =
                categoryIcons[research.category as keyof typeof categoryIcons];
              const categoryColor =
                categoryColors[
                  research.category as keyof typeof categoryColors
                ];
              const animationDelay =
                (projects.iot.length + projects.software.length + index) * 0.1;

              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 project-item"
                  style={{
                    animationDelay: `${animationDelay}s`,
                  }}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-3/4">
                      {/* Header with badges */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-domine font-medium ${categoryColor}`}
                        >
                          <CategoryIcon className="h-4 w-4 mr-1" />
                          {research.category === "ai-iot"
                            ? "AI & IoT"
                            : research.category === "ui-ux"
                            ? "UI/UX Design"
                            : research.category === "system-design"
                            ? "System Design"
                            : "Data Science"}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-domine font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          <FileText className="h-4 w-4 mr-1" />
                          {research.type}
                        </span>
                        <span className="text-sm text-muted-foreground font-domine">
                          {research.institution} • {research.year}
                        </span>
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                        {research.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {research.description}
                      </p>

                      {/* Methodologies and Contributions */}
                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        {/* Methodologies */}
                        <div>
                          <h4 className="font-domine font-semibold mb-2 text-sm">
                            Methodologies
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {research.methodologies
                              .slice(0, 3)
                              .map((method, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                  <span>{method}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Key Contributions */}
                        <div>
                          <h4 className="font-domine font-semibold mb-2 text-sm">
                            Key Contributions
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {research.contributions
                              .slice(0, 3)
                              .map((contribution, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                  <span>{contribution}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {research.technologies.slice(0, 6).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-domine"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="lg:w-1/4 flex lg:justify-end lg:items-start">
                      <ProjectActions
                        documentUrl={research.documentUrl}
                        scholarUrl={research.scholarUrl}
                        type={research.type}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
