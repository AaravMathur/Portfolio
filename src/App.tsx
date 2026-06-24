import React, { useState, useEffect, useRef } from 'react'

// Custom SVGs for DevOps and portfolio icons
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636m12.728 12.728L12 12" />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const TerminalIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const CodeIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const CloudIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)

const CpuIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ArrowUpRightIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}

export default function App() {
  // Theme Toggle State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  
  // Terminal Emulator State
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'output', text: "Welcome to Aarav Mathur's DevOps Portfolio Terminal [Version 2.0.4]" },
    { type: 'output', text: "System Status: ONLINE | OS: Linux Ubuntu 22.04 LTS | Nodes: 3 Active" },
    { type: 'output', text: "Type 'help' to see the available commands." },
  ])
  const [terminalInput, setTerminalInput] = useState<string>('')
  const [showMatrix, setShowMatrix] = useState<boolean>(false)
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const terminalInputRef = useRef<HTMLInputElement>(null)

  // Skills interactive descriptions state
  const [selectedSkill, setSelectedSkill] = useState<{name: string, desc: string} | null>({
    name: "Kubernetes",
    desc: "Aarav is highly proficient in Kubernetes. Implemented scalable container deployments, pod orchestration, services, and ingress setups in multi-cloud environments during internship projects."
  })

  // Pipeline Simulator State
  const [activePipelineStep, setActivePipelineStep] = useState<number>(-1)
  const [pipelineStepsStatus, setPipelineStepsStatus] = useState<('idle' | 'running' | 'success')[]>([
    'idle', 'idle', 'idle', 'idle'
  ])
  const [pipelineConsoleLogs, setPipelineConsoleLogs] = useState<string[]>([
    "Ready to trigger automated DevOps pipeline simulator.",
    "Click 'Run Pipeline' to initiate automated building and provisioning."
  ])
  const [isPipelineComplete, setIsPipelineComplete] = useState<boolean>(false)
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState<boolean>(false)

  // Interactive Sandbox app state
  const [sandboxRequests, setSandboxRequests] = useState([
    { id: 1, type: 'MP', requester: 'MP Jaipur (Avinash G.)', details: 'Diversion of Jaipur-Delhi tracks for railway bridge repair', date: '2026-06-12', status: 'Approved' },
    { id: 2, type: 'MLA', requester: 'MLA Ajmer East (Rajesh K.)', details: 'Establishment of local ticket counter and shelter at diversion platform', date: '2026-06-20', status: 'Pending' },
    { id: 3, type: 'MP', requester: 'MP Sikar (Dr. Manoj S.)', details: 'Urgent repair proposal for level crossing gating systems', date: '2026-06-22', status: 'Pending' },
  ])
  const [newRequestDetails, setNewRequestDetails] = useState<string>('')
  const [newRequestType, setNewRequestType] = useState<'MP' | 'MLA'>('MP')
  const [newRequestRequester, setNewRequestRequester] = useState<string>('')
  const [sandboxFilter, setSandboxFilter] = useState<'ALL' | 'MP' | 'MLA'>('ALL')

  // Contact Form State
  const [formName, setFormName] = useState<string>('')
  const [formEmail, setFormEmail] = useState<string>('')
  const [formSubject, setFormSubject] = useState<string>('')
  const [formMessage, setFormMessage] = useState<string>('')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [showToast, setShowToast] = useState<boolean>(false)

  // Sync theme selection to root document class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [isDarkMode])

  // Scroll to bottom of terminal when history changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [terminalHistory])

  // Handle skills dictionary
  const skillDetails: Record<string, string> = {
    "Kubernetes": "Aarav is highly proficient in Kubernetes. Implemented scalable container deployments, pod orchestration, services, and ingress setups in multi-cloud environments during internship projects.",
    "Docker": "Used for containerizing Python and Java microservices. Created multi-stage Dockerfiles to minimize image size and automated image building through CI/CD pipelines.",
    "Terraform": "Utilized Infrastructure as Code (IaC) to spin up VPCs, subnets, EC2 nodes, and database architectures consistently. Experience provisioning resources on both Azure and AWS.",
    "Amazon Web Service (AWS)": "Knowledge of EC2, S3, IAM, CloudWatch, Route53, and VPC networking. Built scripts using boto3 library for automated resource management.",
    "Azure": "Collaborated during the Celebal Technologies internship to deploy and manage scalable container operations using Azure Cloud infrastructure.",
    "Python": "Primary language for automating deployment scripts, working with AWS boto3 SDK, competitive programming, and backend logic development.",
    "MySQL": "Relational database configuration, SQL query optimization, backups, and user credential permission management.",
    "Jenkins": "Configured build runners, Jenkinsfiles, and integrated webhooks to trigger build/test automation tasks on code push.",
    "Linux": "Deep familiarity with RHEL, Ubuntu, CentOS. Skilled in shell scripting (Bash), system administration, resource monitoring, and permission setups.",
    "Vagrant": "Used for setting up reproducible virtual developer environments to test network topologies and local service bindings.",
    "Tomcat": "Configured Tomcat servlet containers for Java web apps, dealing with SSL binds, keystores, and server tuning configurations.",
    "GitHub": "Advanced version control workflows including branching, pull request policies, action runners, and secure secrets management."
  }

  // Handle Terminal commands
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = terminalInput.trim().toLowerCase()
    if (!trimmedInput) return

    const newHistory = [...terminalHistory, { type: 'input' as const, text: `aarav@portfolio-node:~$ ${terminalInput}` }]

    switch (trimmedInput) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  about      - Detailed summary of Aarav Mathur' },
          { type: 'output', text: '  skills     - Visual breakdown of technical competencies' },
          { type: 'output', text: '  experience - Chronological summary of internships' },
          { type: 'output', text: '  certs      - View professional training & course certificates' },
          { type: 'output', text: '  tfplan     - Execute a simulated Infrastructure-as-Code Terraform dry run' },
          { type: 'output', text: '  k8s        - Query running Kubernetes pod status details' },
          { type: 'output', text: '  matrix     - Initiate a glowing digital rain terminal stream (4s)' },
          { type: 'output', text: '  contact    - Retrieve direct contact lines and social anchors' },
          { type: 'output', text: '  clear      - Clear the command interface' }
        )
        break
      case 'about':
        newHistory.push(
          { type: 'output', text: 'Aarav Mathur | B.Tech CSE Student (Class of 2026)' },
          { type: 'output', text: '------------------------------------------------------------' },
          { type: 'output', text: 'Education:  Amity University Rajasthan (Class of 2026)' },
          { type: 'output', text: 'Location:   Jaipur, Rajasthan, India' },
          { type: 'output', text: 'Specialty:  DevOps Engineering, CI/CD Automations, Infrastructure as Code' },
          { type: 'output', text: 'Focus:      Combining system engineering, virtualization, and cloud networks.' }
        )
        break
      case 'skills':
        newHistory.push(
          { type: 'output', text: 'Aarav\'s DevOps Stack & Core Tools:' },
          { type: 'output', text: '============================================================' },
          { type: 'output', text: '🚀 IaC & Cloud:   Terraform, AWS, Microsoft Azure' },
          { type: 'output', text: '🐳 Container:     Docker, Kubernetes (k8s)' },
          { type: 'output', text: '🛠️ Automation:    Jenkins, GitHub Actions, Vagrant, Tomcat' },
          { type: 'output', text: '💻 Languages:     Python (boto3), MySQL, Shell Scripting, C/C++' },
          { type: 'output', text: '🐧 Platforms:     Linux (RHEL/Ubuntu/CentOS), Windows Server' }
        )
        break
      case 'experience':
        newHistory.push(
          { type: 'output', text: 'Professional Internship Engagements:' },
          { type: 'output', text: '============================================================' },
          { type: 'output', text: '💼 Celebal Technologies | Remote DevOps Intern' },
          { type: 'output', text: '   Duration: June 2025 - Aug 2025' },
          { type: 'output', text: '   Project:  Cloud Infrastructure Management & Operations' },
          { type: 'output', text: '   Work:     IaC scripts (Terraform) for multi-cloud, container scheduling (k8s).' },
          { type: 'output', text: '' },
          { type: 'output', text: '💼 North Western Railways (NWR) | On-Site Developer Intern' },
          { type: 'output', text: '   Duration: June 2024 - Aug 2024' },
          { type: 'output', text: '   Project:  Railway MP Items Web application' },
          { type: 'output', text: '   Work:     Developed internal portals to register, monitor, and update MP/MLA track requests.' }
        )
        break
      case 'tfplan':
        newHistory.push(
          { type: 'output', text: '$ terraform plan' },
          { type: 'output', text: 'Terraform v1.5.0 on linux_amd64' },
          { type: 'output', text: 'Refreshing Terraform state in-memory prior to plan...' },
          { type: 'output', text: '[aws_vpc.prod_vpc]: Refreshing state... [id=vpc-0d9223e7f]' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Terraform will perform the following actions:' },
          { type: 'output', text: '  + resource "aws_instance" "app_node" {' },
          { type: 'output', text: '      + ami                          = "ami-0c55b159cbfafe1f0"' },
          { type: 'output', text: '      + instance_type                = "t3.medium"' },
          { type: 'output', text: '      + associate_public_ip_address = true' },
          { type: 'output', text: '      + tags                         = { "Name" = "production-app-node" }' },
          { type: 'output', text: '    }' },
          { type: 'output', text: '  + resource "kubernetes_deployment" "api_server" {' },
          { type: 'output', text: '      + spec { replicas = 3 }' },
          { type: 'output', text: '    }' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Plan: 2 to add, 0 to change, 0 to destroy.' },
          { type: 'output', text: '------------------------------------------------------------' },
          { type: 'output', text: '💡 Infrastructure checks out! Run simulated build in the pipeline simulator.' }
        )
        break
      case 'k8s':
        newHistory.push(
          { type: 'output', text: '$ kubectl get pods -n production -o wide' },
          { type: 'output', text: 'NAME                               READY   STATUS    RESTARTS   AGE    IP             NODE' },
          { type: 'output', text: 'nwr-app-deploy-67fdc5885-2bxlk     1/1     Running   0          42d    10.244.0.122   k8s-node-1' },
          { type: 'output', text: 'nwr-app-deploy-67fdc5885-9lmqs     1/1     Running   0          42d    10.244.1.84    k8s-node-2' },
          { type: 'output', text: 'celebal-ops-worker-5cc9d74-xxp91   1/1     Running   1          14d    10.244.1.95    k8s-node-2' },
          { type: 'output', text: '' },
          { type: 'output', text: 'STATUS: cluster is HEALTHY | Pod Replicas: 3/3 active | LoadBalancer active' }
        )
        break
      case 'certs':
      case 'certificates':
        newHistory.push(
          { type: 'output', text: 'Aarav\'s Tech Certifications & Professional Training:' },
          { type: 'output', text: '============================================================' },
          { type: 'output', text: '📜 DevOps Cloud Infrastructure Management & Operations - Celebal Tech (2025)' },
          { type: 'output', text: '📜 DevOps Integrated with AI Certificate - Coursera (Sept 2025)' },
          { type: 'output', text: '📜 Docker & Jenkins Course Certificate - Infosys (July 2025)' },
          { type: 'output', text: '📜 Complete DevOps Bootcamp - Udemy (July 2025)' },
          { type: 'output', text: '📜 Web Development Project Certification - NWR (May 2024)' },
          { type: 'output', text: '📜 C & C++ Programming Course Certificate - Swati Computers (Aug 2022)' }
        )
        break
      case 'matrix':
        setShowMatrix(true)
        setTimeout(() => setShowMatrix(false), 4000)
        newHistory.push({ type: 'output', text: 'Matrix simulation complete.' })
        break
      case 'contact':
        newHistory.push(
          { type: 'output', text: 'Direct Coordinates:' },
          { type: 'output', text: '📫 Email:   mathuraarav2005@gmail.com' },
          { type: 'output', text: '📞 Phone:   +91 9887045678' },
          { type: 'output', text: '🔗 LinkedIn: www.linkedin.com/in/aarav-mathur-514a62202' },
          { type: 'output', text: '🏠 Address:  24/143 Swarn Path Mansarovar, Jaipur' }
        )
        break
      case 'clear':
        setTerminalHistory([])
        setTerminalInput('')
        return
      default:
        newHistory.push({ type: 'output', text: `Command not found: '${trimmedInput}'. Type 'help' for available actions.` })
    }

    setTerminalHistory(newHistory)
    setTerminalInput('')
  }

  // Trigger automated pipeline step simulation
  const runPipelineSimulator = async () => {
    setIsPipelineComplete(false)
    const logs = [
      [
        "Initializing pipeline workspace...",
        "Executing: git add .",
        "Executing: git commit -m 'feat: update orchestration scripts'",
        "Pushing commit to branch main...",
        "GitHub Webhook triggered Jenkins server.",
        "✅ Code integration stage complete."
      ],
      [
        "Pipeline Step: Docker image compilation",
        "Executing: docker build -t aaravmathur/railway-app:v2 .",
        "Sending build context to Docker daemon 4.2MB",
        "Step 1/4 : FROM python:3.11-alpine",
        "Step 2/4 : COPY ./requirements.txt /app/requirements.txt",
        "Step 3/4 : RUN pip install --no-cache-dir -r /app/requirements.txt",
        "Step 4/4 : COPY . /app",
        "Successfully compiled container image. Tagged: aaravmathur/railway-app:v2",
        "✅ Image pushed to Docker Hub registry."
      ],
      [
        "Pipeline Step: Terraform Infrastructure Deployment",
        "Executing: terraform init",
        "Initializing cloud providers (AWS, Azure)...",
        "Executing: terraform apply -auto-approve",
        "aws_instance.app_host: Creating...",
        "aws_instance.app_host: Still creating... (10s elapsed)",
        "aws_instance.app_host: Creation complete [id=i-9bca473ef2]",
        "✅ Infrastructure deployment completed successfully."
      ],
      [
        "Pipeline Step: Kubernetes Service Rollout",
        "Executing: kubectl apply -f k8s/deployment.yaml",
        "deployment.apps/nwr-app created",
        "service/nwr-app-svc created",
        "Executing: kubectl rollout status deployment/nwr-app",
        "Waiting for 3 replicas to enter running state...",
        "Replica 1: Running, Replica 2: Running, Replica 3: Running",
        "✅ Service rollout completed. Application IP published."
      ]
    ]

    setPipelineConsoleLogs(["[Pipeline Started] Initiating automated DevOps pipeline run..."])
    const stepStatuses = ['idle', 'idle', 'idle', 'idle'] as const
    setPipelineStepsStatus([...stepStatuses])

    for (let i = 0; i < 4; i++) {
      setActivePipelineStep(i)
      const currentStatuses = ['success', 'success', 'success', 'success'] as ('idle' | 'running' | 'success')[]
      for (let j = 0; j < 4; j++) {
        if (j < i) currentStatuses[j] = 'success'
        else if (j === i) currentStatuses[j] = 'running'
        else currentStatuses[j] = 'idle'
      }
      setPipelineStepsStatus(currentStatuses)

      // Print logs one by one
      for (const line of logs[i]) {
        setPipelineConsoleLogs(prev => [...prev, `[Step ${i+1}] ${line}`])
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    }

    setPipelineStepsStatus(['success', 'success', 'success', 'success'])
    setPipelineConsoleLogs(prev => [
      ...prev,
      "============================================================",
      "🎉 PIPELINE DEPLOYMENT: SUCCESSFUL",
      "URL: https://nwr-mp-items.aarav.dev",
      "Status: Live Sandbox environment is now accessible!"
    ])
    setIsPipelineComplete(true)
    setActivePipelineStep(-1)
  }

  // Handle add request in mock Sandbox app
  const addSandboxRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRequestDetails || !newRequestRequester) return
    const newReq = {
      id: Date.now(),
      type: newRequestType,
      requester: `${newRequestType} ${newRequestRequester}`,
      details: newRequestDetails,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    }
    setSandboxRequests([newReq, ...sandboxRequests])
    setNewRequestDetails('')
    setNewRequestRequester('')
  }

  const approveSandboxRequest = (id: number) => {
    setSandboxRequests(sandboxRequests.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ))
  }

  const rejectSandboxRequest = (id: number) => {
    setSandboxRequests(sandboxRequests.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ))
  }

  // Handle Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formMessage) return
    
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormName('')
      setFormEmail('')
      setFormSubject('')
      setFormMessage('')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }, 1500)
  }

  // Filter requests
  const filteredRequests = sandboxRequests.filter(req => {
    if (sandboxFilter === 'ALL') return true
    return req.type === sandboxFilter
  })

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Toast Alert */}
      {showToast && (
        <div className="toast">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Message recorded! Aarav will get back to you shortly.</span>
        </div>
      )}

      {/* Navbar Header */}
      <header className="header">
        <div className="header-container">
          <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white" style={{ background: 'var(--accent-gradient)', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>
              AM
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
              Aarav<span className="text-gradient">.DevOps</span>
            </span>
          </div>

          <nav className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#terminal" className="nav-link">Interactive Terminal</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#pipeline" className="nav-link">DevOps Pipeline</a>
            <a href="#contact" className="nav-link">Contact</a>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="theme-toggle-btn"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            
            <a 
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Aarav_Mathur_Resume.pdf"
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <DownloadIcon />
              <span>Resume</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section" id="about" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center', paddingTop: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/20" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--glow-color)', color: 'var(--accent-purple)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', border: '1px solid var(--border-color)' }}>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)', display: 'inline-block' }}></span>
              Ready for DevOps Internships (Graduating 2026)
            </div>
            <h1 style={{ fontSize: '3.6rem', lineHeight: '1.1', marginTop: '16px', marginBottom: '8px' }}>
              Hi, I'm <span className="text-gradient">Aarav Mathur</span>
            </h1>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '16px' }}>
              Cloud Infrastructure & DevOps Engineer
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
              Specializing in building robust containerized pipelines, automating cloud provisioning, and implementing Infrastructure as Code. Passionate about Linux systems, Kubernetes orchestration, and competitive programming.
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-purple)' }}>6+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tech Certifications</div>
            </div>
            <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>2</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Internships Completed</div>
            </div>
            <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-green)' }}>2026</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Graduation Year</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#pipeline" className="btn-primary">
              <span>Test Deployment Pipeline</span>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </a>
            <a href="#terminal" className="btn-secondary">
              <TerminalIcon />
              <span>Open Terminal Terminal</span>
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {/* Decorative glowing backdrops */}
          <div style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            background: 'var(--accent-gradient)',
            filter: 'blur(60px)',
            opacity: '0.3',
            zIndex: 0,
            borderRadius: '50%'
          }}></div>
          
          <img 
            src={`${import.meta.env.BASE_URL}avatar.jpg`} 
            alt="Aarav Mathur DevOps Illustration" 
            className="animate-float"
            style={{ 
              width: '100%', 
              maxWidth: '360px', 
              borderRadius: '24px', 
              border: '2px solid var(--border-color)', 
              boxShadow: 'var(--shadow-glow)', 
              zIndex: 1,
              position: 'relative',
              aspectRatio: '1/1',
              objectFit: 'cover'
            }} 
          />
        </div>
      </section>

      {/* Main Divider Ticks */}
      <div className="ticks" style={{ height: '1px', borderTop: '1px solid var(--border-color)', margin: '40px 0' }}></div>

      {/* Terminal Emulator Section */}
      <section className="section animate-fade-in" id="terminal">
        <div className="section-title">
          <TerminalIcon />
          <h2>Interactive DevOps Terminal</h2>
        </div>
        <p className="section-subtitle">
          An interactive Linux-like interface simulating real-time queries for Aarav's configurations. Enter commands like <code style={{ color: 'var(--accent-purple)' }}>help</code>, <code style={{ color: 'var(--accent-cyan)' }}>tfplan</code>, <code style={{ color: 'var(--accent-green)' }}>certs</code>, or <code style={{ color: 'var(--accent-amber)' }}>matrix</code>.
        </p>

        <div className="terminal-window">
          {showMatrix && (
            <div className="matrix-overlay">
              <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '1.2rem', textAlign: 'center', lineHeight: '1.4' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ animation: `pulse-border ${0.5 + i * 0.1}s infinite alternate` }}>
                    {Array.from({ length: 30 }).map(() => Math.round(Math.random())).join(' ')}
                  </div>
                ))}
                <div style={{ marginTop: '20px', fontWeight: 'bold', color: 'white' }}>SIMULATING CLOUD PIPELINE NETWORKS...</div>
              </div>
            </div>
          )}
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <div className="terminal-title">aarav@portfolio-node: ~</div>
            <div style={{ width: '40px' }}></div>
          </div>
          
          <div ref={terminalBodyRef} className="terminal-body" onClick={() => terminalInputRef.current?.focus()}>
            {terminalHistory.map((line, index) => (
              <div key={index} className="terminal-line">
                {line.type === 'input' ? (
                  <span>{line.text}</span>
                ) : (
                  <span style={{ color: line.text.startsWith('$') || line.text.startsWith('Plan:') || line.text.startsWith('STATUS:') ? 'var(--accent-cyan)' : 'inherit' }}>
                    {line.text}
                  </span>
                )}
              </div>
            ))}
            
            <div className="terminal-input-line">
              <span className="terminal-prompt">aarav@portfolio-node:~$</span>
              <form onSubmit={handleTerminalSubmit} style={{ flex: 1, display: 'flex' }}>
                <input
                  ref={terminalInputRef}
                  type="text"
                  className="terminal-input"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type command here (e.g. tfplan)..."
                />
              </form>
            </div>
            {/* Scroll Anchor */}
          </div>
        </div>
      </section>

      {/* Main Divider Ticks */}
      <div className="ticks" style={{ height: '1px', borderTop: '1px solid var(--border-color)', margin: '40px 0' }}></div>

      {/* Internships & Projects Section */}
      <section className="section" id="experience">
        <div className="section-title">
          <CpuIcon />
          <h2>Professional Experiences & Projects</h2>
        </div>
        <p className="section-subtitle">
          Real world experiences applying DevOps configurations, container deployments, cloud orchestration, and custom web interface integrations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Celebal Technologies */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem' }}>Cloud Infrastructure & DevOps Intern</h3>
                  <div style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>Celebal Technologies (Remote)</div>
                </div>
                <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--glow-color)', color: 'var(--accent-blue)', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid var(--border-color)' }}>
                  June 2025 - Aug 2025
                </span>
              </div>
              <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
                Designed and managed scalable cloud infrastructure to streamline deployments, monitor resources, and optimize operational costs in multi-cloud contexts.
              </p>
              
              <ul style={{ marginTop: '16px', paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Implemented Infrastructure as Code (IaC) via <strong>Terraform</strong> templates.</li>
                <li>Built orchestration topologies using <strong>Kubernetes</strong> and Docker containers.</li>
                <li>Worked with Azure services to configure secure network topologies.</li>
                <li>Optimized resource configurations saving significant cloud overhead expenses.</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '16px' }}>
              {["Terraform", "Docker", "Kubernetes", "Azure", "CI/CD"].map(tag => (
                <span key={tag} style={{ background: 'var(--bg-tertiary)', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* North Western Railways */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem' }}>Web Developer & Operations Intern</h3>
                  <div style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>North Western Railways (NWR) | On-Site</div>
                </div>
                <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--glow-color)', color: 'var(--accent-blue)', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid var(--border-color)' }}>
                  June 2024 - July 2024
                </span>
              </div>
              <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
                Collaborated within railway engineering divisions in Jaipur to design and launch an internal portal to streamline tracks requests initiated by MPs and MLAs.
              </p>
              
              <ul style={{ marginTop: '16px', paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Built clean interfaces mapping requests scope, track layout, and repairs metrics.</li>
                <li>Provided the General Manager (GM) with a centralized approval administration node.</li>
                <li>Developed features tracking status changes from initiation to completion.</li>
                <li>Introduced user permissions separation ensuring strict data sanity bounds.</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '16px' }}>
              {["HTML/CSS", "JavaScript", "Python", "MySQL", "Vagrant"].map(tag => (
                <span key={tag} style={{ background: 'var(--bg-tertiary)', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Education & Certifications Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', marginTop: '48px' }}>
          {/* Left side: Education */}
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>Education</h3>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.2rem' }}>B.Tech in Computer Science Engineering</h4>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>2022 - 2026</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>Amity University Rajasthan</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Focus: Systems Engineering, DevOps & Cloud Architectures</p>
              </div>

              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.2rem' }}>Higher Secondary Schooling (12th CBSE)</h4>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>Completed 2022</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>SBIOA Public School</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Graduated High School Science & Math</p>
              </div>

              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.2rem' }}>Secondary Schooling (10th CBSE)</h4>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>Completed 2020</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>Banyan Tree School</div>
              </div>
            </div>
          </div>

          {/* Right side: Certifications */}
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>Certifications & Training</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>DevOps Cloud Infrastructure Management</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Celebal Technologies (Docker & Azure Project Training) | 2025</div>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>DevOps Integrated with AI Course</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Coursera | Sept 2025</div>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Docker & Jenkins Certification</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Infosys | July 2025</div>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Complete DevOps Bootcamp</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Udemy Course | July 2025</div>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Web Development Project Certification</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>North Western Railways | May 2024</div>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>C & C++ Programming</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Swati Computers Training | Aug 2022</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Divider Ticks */}
      <div className="ticks" style={{ height: '1px', borderTop: '1px solid var(--border-color)', margin: '40px 0' }}></div>

      {/* Technical Skills Section */}
      <section className="section" id="skills">
        <div className="section-title">
          <CodeIcon />
          <h2>Interactive Technical Matrix</h2>
        </div>
        <p className="section-subtitle">
          Hover and click on any core skill node to review custom deployment notes, scope details, and Aarav's experience with that technology.
        </p>

        <div className="skills-grid">
          {/* Cloud & Platform Card */}
          <div className="skill-category-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: '700' }}>
              <CloudIcon />
              <h4>Cloud & Platform Networks</h4>
            </div>
            <div className="skill-tags">
              {["Amazon Web Service (AWS)", "Azure", "Linux"].map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill({ name: skill, desc: skillDetails[skill] })}
                  className={`skill-tag ${selectedSkill?.name === skill ? 'selected' : ''}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Infrastructure & DevOps */}
          <div className="skill-category-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontWeight: '700' }}>
              <CpuIcon />
              <h4>Containers & Infrastructure</h4>
            </div>
            <div className="skill-tags">
              {["Kubernetes", "Docker", "Terraform", "Vagrant"].map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill({ name: skill, desc: skillDetails[skill] })}
                  className={`skill-tag ${selectedSkill?.name === skill ? 'selected' : ''}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Development Automation */}
          <div className="skill-category-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: '700' }}>
              <TerminalIcon />
              <h4>Development & Pipelines</h4>
            </div>
            <div className="skill-tags">
              {["Python", "MySQL", "Jenkins", "GitHub", "Tomcat"].map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill({ name: skill, desc: skillDetails[skill] })}
                  className={`skill-tag ${selectedSkill?.name === skill ? 'selected' : ''}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Skill Visual Box */}
        {selectedSkill && (
          <div className="glass-card" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-purple)' }}></span>
              <strong style={{ fontSize: '1.1rem' }}>{selectedSkill.name}</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{selectedSkill.desc}</p>
          </div>
        )}
      </section>

      {/* Main Divider Ticks */}
      <div className="ticks" style={{ height: '1px', borderTop: '1px solid var(--border-color)', margin: '40px 0' }}></div>

      {/* DevOps Pipeline Simulator Section */}
      <section className="section" id="pipeline">
        <div className="section-title">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h2>Interactive DevOps Pipeline Simulator</h2>
        </div>
        <p className="section-subtitle">
          Trigger a simulated GitHub-to-Kubernetes CI/CD workflow. Watch logs compile and deploy, then interact with the successfully hosted live sandbox application!
        </p>

        <div className="pipeline-container">
          {/* Step 1 */}
          <div className={`pipeline-step ${pipelineStepsStatus[0]} ${activePipelineStep === 0 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 01</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Git Commit</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[0] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[0] === 'success' ? '✔ Pushed' : activePipelineStep === 0 ? '⚙ Running...' : 'Pending'}
            </span>
            <div className="pipeline-connector"></div>
          </div>

          {/* Step 2 */}
          <div className={`pipeline-step ${pipelineStepsStatus[1]} ${activePipelineStep === 1 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 02</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Docker Build</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[1] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[1] === 'success' ? '✔ Packaged' : activePipelineStep === 1 ? '⚙ Building...' : 'Locked'}
            </span>
            <div className="pipeline-connector"></div>
          </div>

          {/* Step 3 */}
          <div className={`pipeline-step ${pipelineStepsStatus[2]} ${activePipelineStep === 2 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 03</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Terraform IaC</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[2] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[2] === 'success' ? '✔ Provisioned' : activePipelineStep === 2 ? '⚙ Provisioning...' : 'Locked'}
            </span>
            <div className="pipeline-connector"></div>
          </div>

          {/* Step 4 */}
          <div className={`pipeline-step ${pipelineStepsStatus[3]} ${activePipelineStep === 3 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 04</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>K8s Deploy</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[3] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[3] === 'success' ? '✔ Scheduled' : activePipelineStep === 3 ? '⚙ Rollout...' : 'Locked'}
            </span>
          </div>
        </div>

        {/* Pipeline Controls & Log Board */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.35fr 0.65fr', gap: '24px', alignItems: 'start' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Pipeline Control Node</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Automate container updates, provision cloud virtual clusters on AWS/Azure, and trigger ingress mappings.
            </p>
            <button
              onClick={runPipelineSimulator}
              disabled={activePipelineStep !== -1}
              className="btn-primary"
              style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
            >
              {activePipelineStep === -1 ? 'Run Pipeline Simulation' : 'Pipeline Running...'}
            </button>

            {isPipelineComplete && (
              <button
                onClick={() => setIsSandboxModalOpen(true)}
                className="btn-secondary"
                style={{ 
                  justifyContent: 'center', 
                  width: '100%', 
                  padding: '12px',
                  borderColor: 'var(--accent-green)',
                  background: 'rgba(16, 185, 129, 0.08)',
                  color: 'var(--accent-green)',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.15)'
                }}
              >
                <span>Inspect Live Sandbox App</span>
                <ArrowUpRightIcon />
              </button>
            )}
          </div>

          <div className="terminal-window">
            <div className="terminal-header" style={{ padding: '8px 12px' }}>
              <div className="terminal-title">Runner Output: deploy_pipeline.log</div>
              <div className="w-2.5 h-2.5 rounded-full" style={{ width: '10px', height: '10px', background: activePipelineStep !== -1 ? 'var(--accent-amber)' : isPipelineComplete ? 'var(--accent-green)' : 'var(--text-muted)' }}></div>
            </div>
            <div className="terminal-body" style={{ height: '220px', padding: '12px', fontSize: '0.85rem' }}>
              {pipelineConsoleLogs.map((log, index) => (
                <div key={index} className="terminal-line" style={{ color: log.startsWith('✅') ? 'var(--accent-green)' : log.includes('SUCCESS') ? 'var(--accent-green)' : log.includes('STAGE') ? 'var(--accent-purple)' : 'inherit' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOCK SANDBOX APPLICATION DRAWER / WINDOW */}
        {isSandboxModalOpen && (
          <div style={{
            marginTop: '32px',
            border: '2px solid var(--accent-green)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-glow-cyan)'
          }} className="glass-card">
            {/* Header tab showing simulated web browser bar */}
            <div style={{
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-color)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="w-3 h-3 rounded-full bg-red-500" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></span>
                <span className="w-3 h-3 rounded-full bg-green-500" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></span>
              </div>

              {/* URL address simulation bar */}
              <div style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                padding: '4px 16px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                width: '100%',
                maxWidth: '450px',
                textAlign: 'center',
                fontFamily: 'monospace'
              }}>
                🔒 https://nwr-mp-items.aarav.dev <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>[Live Sandbox]</span>
              </div>

              <button 
                onClick={() => setIsSandboxModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Close Sandbox ✖
              </button>
            </div>

            {/* Simulated app interface */}
            <div style={{ padding: '24px', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem' }}>Railway MP/MLA Requests Portal</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>North Western Railways, Jaipur - GM Command Node</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {["ALL", "MP", "MLA"].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setSandboxFilter(filter as any)}
                      style={{
                        padding: '4px 12px',
                        fontSize: '0.8rem',
                        borderRadius: '4px',
                        background: sandboxFilter === filter ? 'var(--accent-purple)' : 'var(--bg-tertiary)',
                        color: sandboxFilter === filter ? 'white' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer'
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid content of application */}
              <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr', gap: '24px' }}>
                {/* Form to submit requests */}
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px' }}>Submit New Track Proposal</h4>
                  <form onSubmit={addSandboxRequest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Type</label>
                        <select 
                          value={newRequestType} 
                          onChange={(e) => setNewRequestType(e.target.value as any)}
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            padding: '8px',
                            borderRadius: '4px'
                          }}
                        >
                          <option value="MP">MP</option>
                          <option value="MLA">MLA</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Name / District</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Sikar (Manoj)" 
                          value={newRequestRequester} 
                          onChange={(e) => setNewRequestRequester(e.target.value)}
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            padding: '8px',
                            borderRadius: '4px'
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Proposal Details</label>
                      <textarea 
                        rows={2} 
                        placeholder="Details of track diversion, repairs, or crossings..." 
                        value={newRequestDetails} 
                        onChange={(e) => setNewRequestDetails(e.target.value)}
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          padding: '8px',
                          borderRadius: '4px',
                          resize: 'none'
                        }}
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary" 
                      style={{ padding: '8px', justifyContent: 'center', fontSize: '0.9rem' }}
                    >
                      File Official Request
                    </button>
                  </form>
                </div>

                {/* Requests table listing */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto' }}>
                  {filteredRequests.map(req => (
                    <div 
                      key={req.id} 
                      style={{ 
                        background: 'var(--bg-secondary)', 
                        padding: '12px 16px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 'bold', 
                          color: req.type === 'MP' ? 'var(--accent-purple)' : 'var(--accent-cyan)',
                          background: 'var(--bg-tertiary)',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {req.requester}
                        </span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            color: req.status === 'Approved' ? 'var(--accent-green)' : req.status === 'Rejected' ? '#EF4444' : 'var(--accent-amber)',
                            fontWeight: 'bold' 
                          }}>
                            ● {req.status}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{req.date}</span>
                        </div>
                      </div>
                      
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.details}</p>
                      
                      {req.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px', alignSelf: 'flex-end' }}>
                          <button
                            onClick={() => approveSandboxRequest(req.id)}
                            style={{
                              padding: '2px 8px',
                              background: 'rgba(16, 185, 129, 0.1)',
                              color: 'var(--accent-green)',
                              border: '1px solid var(--accent-green)',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            Approve (GM)
                          </button>
                          <button
                            onClick={() => rejectSandboxRequest(req.id)}
                            style={{
                              padding: '2px 8px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: '#EF4444',
                              border: '1px solid #EF4444',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {filteredRequests.length === 0 && (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                      No requests match the selected filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Divider Ticks */}
      <div className="ticks" style={{ height: '1px', borderTop: '1px solid var(--border-color)', margin: '40px 0' }}></div>

      {/* Contact Section */}
      <section className="section" id="contact" style={{ display: 'grid', gridTemplateColumns: '0.45fr 0.55fr', gap: '48px' }}>
        <div>
          <div className="section-title">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2>Get In Touch</h2>
          </div>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Looking for a DevOps engineering intern, cloud script automation helper, or just want to chat about infrastructure? Feel free to reach out.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: 'var(--bg-tertiary)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-purple)',
                border: '1px solid var(--border-color)'
              }}>
                <MailIcon />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</div>
                <a href="mailto:mathuraarav2005@gmail.com" style={{ fontWeight: '500' }}>mathuraarav2005@gmail.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: 'var(--bg-tertiary)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
                border: '1px solid var(--border-color)'
              }}>
                <PhoneIcon />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Call</div>
                <a href="tel:+919887045678" style={{ fontWeight: '500' }}>+91 9887045678</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                background: 'var(--bg-tertiary)',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-green)',
                border: '1px solid var(--border-color)'
              }}>
                <LocationIcon />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</div>
                <div style={{ fontWeight: '500' }}>Jaipur, Rajasthan, India</div>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <a 
              href="https://www.linkedin.com/in/aarav-mathur-514a62202" 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRightIcon />
            </a>
            <a 
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Aarav_Mathur_Resume.pdf"
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <DownloadIcon />
              <span>Get Resume (PDF)</span>
            </a>
          </div>

          <div style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Languages Known:</strong> Hindi (Professional), English (Professional), French (Beginner)
          </div>
        </div>

        {/* Interactive contact submission form */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Send a Message</h3>
          
          {formStatus === 'success' ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-green)'
              }}>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-green)' }}>Submission Successful!</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
                  Thank you for reaching out. The container state mock successfully piped your message records.
                </p>
              </div>
              <button 
                onClick={() => setFormStatus('idle')} 
                className="btn-secondary"
                style={{ fontSize: '0.9rem', marginTop: '12px' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. John Doe" 
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. john@example.com" 
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="e.g. Internship Opportunity" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea 
                  rows={4} 
                  className="form-textarea" 
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="What would you like to build together?" 
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={formStatus === 'sending'}
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              >
                {formStatus === 'sending' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }}>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending message to cluster...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: '80px',
        borderTop: '1px solid var(--border-color)',
        padding: '32px 5% 40px',
        background: 'var(--bg-secondary)',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <p>© 2026 Aarav Mathur. Designed and built as an interactive React portfolio.</p>
        <p style={{ marginTop: '8px', fontSize: '0.8rem' }}>
          Hosted on cluster. Running Node v20. Ready to deploy via Kubernetes.
        </p>
      </footer>
    </div>
  )
}
