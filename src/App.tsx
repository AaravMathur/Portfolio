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
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const terminalInputRef = useRef<HTMLInputElement>(null)

  // Skills interactive descriptions state
  const [selectedSkill, setSelectedSkill] = useState<{name: string, desc: string} | null>({
    name: "Selenium",
    desc: "Highly skilled in web automation using Selenium WebDriver in Python. Developed robust test suites, DOM selector routines, and responsive layout assertions."
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

  // QA Dashboard State
  const [qaActiveTab, setQaActiveTab] = useState<'selenium' | 'postman' | 'jmeter'>('selenium')
  const [qaTestStatus, setQaTestStatus] = useState<'idle' | 'running' | 'success' | 'failure'>('idle')
  const [qaProgress, setQaProgress] = useState<number>(0)
  const [qaLogs, setQaLogs] = useState<string[]>(["Select a test suite and click 'Execute Test Suite' above."])
  const [qaSeleniumUrl, setQaSeleniumUrl] = useState<string>('https://example.com')
  const [qaPostmanUrl, setQaPostmanUrl] = useState<string>('https://jsonplaceholder.typicode.com/todos/1')
  const [qaJmeterUrl, setQaJmeterUrl] = useState<string>('https://example.com')
  const [seleniumTestOutcome, setSeleniumTestOutcome] = useState<'success' | 'failure'>('success')
  const [seleniumCurrentStep, setSeleniumCurrentStep] = useState<number>(0)
  const [seleniumUserVal, setSeleniumUserVal] = useState<string>('')
  const [seleniumPassVal, setSeleniumPassVal] = useState<string>('')

  // Postman Mock States
  const [postmanMockStep, setPostmanMockStep] = useState<number>(0)
  const [postmanMockMethod, setPostmanMockMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>('GET')
  const [postmanMockUrl, setPostmanMockUrl] = useState<string>('')
  const [postmanMockStatus, setPostmanMockStatus] = useState<string>('')
  const [postmanMockResponse, setPostmanMockResponse] = useState<string>('')

  // JMeter Mock States
  const [jmeterMockStep, setJmeterMockStep] = useState<number>(0)
  const [jmeterThreadCount, setJmeterThreadCount] = useState<number>(0)
  const [jmeterRequestCount, setJmeterRequestCount] = useState<number>(0)
  const [jmeterAvgLatency, setJmeterAvgLatency] = useState<number>(0)
  const [jmeterThroughput, setJmeterThroughput] = useState<number>(0)
  const [jmeterActiveView, setJmeterActiveView] = useState<'Aggregate' | 'Graph'>('Aggregate')

  // Reset QA logs when active tab changes
  useEffect(() => {
    setQaTestStatus('idle')
    setQaProgress(0)
    setSeleniumCurrentStep(0)
    setSeleniumUserVal('')
    setSeleniumPassVal('')
    setPostmanMockStep(0)
    setPostmanMockMethod('GET')
    setPostmanMockUrl('')
    setPostmanMockStatus('')
    setPostmanMockResponse('')
    setJmeterMockStep(0)
    setJmeterThreadCount(0)
    setJmeterRequestCount(0)
    setJmeterAvgLatency(0)
    setJmeterThroughput(0)
    setQaLogs([`Ready to run ${qaActiveTab === 'selenium' ? 'Selenium UI WebDriver' : qaActiveTab === 'postman' ? 'Postman Newman API' : 'JMeter Load Performance'} test suite.`])
  }, [qaActiveTab])

  const runQaTestSuite = async () => {
    setQaTestStatus('running')
    setQaProgress(0)
    setQaLogs([])

    if (qaActiveTab === 'selenium') {
      setSeleniumCurrentStep(1)
      setSeleniumUserVal('')
      setSeleniumPassVal('')

      const step1Logs = [
        "⚡ Starting Selenium UI Automation task on OrangeHRM...",
        "📦 Loading chromedriver executable for Chromium browser v122...",
        "🌐 Launching Chrome Web Browser (Headless Mode: False)...",
        "🌐 WebDriver connecting to: https://opensource-demo.orangehrmlive.com/web/auth/login",
        "🔍 Scanning page layout for DOM selector targets...",
        "✔ Found login element fields: name='username', name='password', type='submit'"
      ]

      for (let i = 0; i < step1Logs.length; i++) {
        setQaLogs(prev => [...prev, step1Logs[i]])
        setQaProgress(Math.round(((i + 1) / 20) * 100))
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Step 2: Move cursor to username and type it
      setSeleniumCurrentStep(2)
      setQaLogs(prev => [...prev, "🖱️ Action: Moving mouse cursor to Username input node..."])
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const usernameText = "Admin"
      let userTyped = ""
      for (let char of usernameText) {
        userTyped += char
        setSeleniumUserVal(userTyped)
        await new Promise(resolve => setTimeout(resolve, 150))
      }
      setQaLogs(prev => [...prev, "⌨ Action: Typing characters: A, d, m, i, n..."])
      await new Promise(resolve => setTimeout(resolve, 400))

      // Step 3: Move cursor to password and type it
      setSeleniumCurrentStep(3)
      setQaLogs(prev => [...prev, "🖱️ Action: Moving mouse cursor to Password input node..."])
      await new Promise(resolve => setTimeout(resolve, 600))

      const passwordText = seleniumTestOutcome === 'success' ? "admin123" : "wrong123"
      let passTyped = ""
      for (let char of passwordText) {
        passTyped += char
        setSeleniumPassVal(passTyped)
        await new Promise(resolve => setTimeout(resolve, 150))
      }
      setQaLogs(prev => [
        ...prev, 
        seleniumTestOutcome === 'success' 
          ? "⌨ Action: Typing characters: a, d, m, i, n, 1, 2, 3..." 
          : "⌨ Action: Typing characters: w, r, o, n, g, 1, 2, 3..."
      ])
      await new Promise(resolve => setTimeout(resolve, 400))

      // Step 4: Click Login button
      setSeleniumCurrentStep(4)
      setQaLogs(prev => [
        ...prev,
        "🖱️ Action: Moving mouse cursor to Login submit button...",
        "🖱️ Action: Triggering element click event..."
      ])
      setQaProgress(75)
      await new Promise(resolve => setTimeout(resolve, 800))

      // Step 5: Redirect and outcome
      setSeleniumCurrentStep(5)
      setQaLogs(prev => [...prev, "⌛ Awaiting server authentication redirect validation..."])
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (seleniumTestOutcome === 'success') {
        setQaLogs(prev => [
          ...prev,
          "✔ Browser URL changed to: https://opensource-demo.orangehrmlive.com/web/dashboard",
          "🧪 Assertion 01: Profile welcome avatar matches 'Admin' [PASSED]",
          "🧪 Assertion 02: Quick Launch card elements are visible [PASSED]",
          "🧹 Releasing chromedriver process handles and shutting down browser...",
          "🎉 SUCCESS: Selenium UI test suite executed on OrangeHRM with 100% assertions passed!"
        ])
        setQaProgress(100)
        setQaTestStatus('success')
      } else {
        setQaLogs(prev => [
          ...prev,
          "⚠️ Red validation alert banner caught: 'Invalid credentials'",
          "❌ Browser URL remained on: https://opensource-demo.orangehrmlive.com/web/auth/login",
          "🧪 Assertion 01: Expected redirect to containing '/dashboard', but remained on '/login' [FAILED]",
          "🧹 Capturing error page screenshot: failure_screenshot_login_fail.png",
          "🧹 Releasing chromedriver process handles and shutting down browser...",
          "❌ AssertionError: Welcome banner element not found. UI login verification failed!",
          "❌ Process finished with exit code 1"
        ])
        setQaProgress(100)
        setQaTestStatus('failure')
      }
    } else if (qaActiveTab === 'postman') {
      const rawUrl = qaPostmanUrl.trim() || 'https://jsonplaceholder.typicode.com/todos/1'
      let baseUrl = 'https://jsonplaceholder.typicode.com'
      let hostname = 'jsonplaceholder.typicode.com'
      try {
        const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`)
        baseUrl = `${parsed.protocol}//${parsed.hostname}`
        hostname = parsed.hostname
      } catch (e) {
        // fallback
      }

      setQaLogs([
        "⚡ Starting Newman command line collection runner...",
        `🚀 Executing: newman run api_test_suite.json --env production -r cli`,
        `📂 Running test sequence targeting host: ${hostname} (5 requests: GET, POST, PUT, PATCH, DELETE)...`,
        "⌛ Preparing HTTP headers, content-types, and request payloads..."
      ])
      setQaProgress(10)
      setPostmanMockStep(1)
      setPostmanMockMethod('GET')
      setPostmanMockUrl(`${baseUrl}/users`)
      setPostmanMockStatus('Sending...')
      setPostmanMockResponse('{}')
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 1. GET Request
      let startTime = performance.now()
      let latency = 50
      let getResponseObj = [
        { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz" },
        { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv" }
      ]
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(`${baseUrl}/users?limit=2`, { signal: controller.signal })
        clearTimeout(timeoutId)
        getResponseObj = await res.json()
        latency = Math.round(performance.now() - startTime)
      } catch (e) {
        latency = Math.round(50 + Math.random() * 80)
      }
      setPostmanMockStatus(`200 OK • ${latency}ms`)
      setPostmanMockResponse(JSON.stringify(getResponseObj, null, 2))
      setQaLogs(prev => [
        ...prev,
        `GET ${baseUrl}/users | Status: 200 OK | Time: ${latency}ms`,
        "  ✔ Assertion: Response status code is 200 - PASSED",
        "  ✔ Assertion: Response body matches JSON array schema - PASSED"
      ])
      setQaProgress(30)
      await new Promise(resolve => setTimeout(resolve, 1200))

      // 2. POST Request (Push)
      setPostmanMockStep(2)
      setPostmanMockMethod('POST')
      setPostmanMockUrl(`${baseUrl}/users`)
      setPostmanMockStatus('Sending...')
      setPostmanMockResponse('{}')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      startTime = performance.now()
      let postResponseObj = { id: 11, name: "Aarav Mathur", username: "aarav", email: "mathuraarav2005@gmail.com" }
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(`${baseUrl}/users`, {
          method: 'POST',
          body: JSON.stringify({ name: "Aarav Mathur", username: "aarav", email: "mathuraarav2005@gmail.com" }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        postResponseObj = await res.json()
        latency = Math.round(performance.now() - startTime)
      } catch (e) {
        latency = Math.round(80 + Math.random() * 100)
      }
      setPostmanMockStatus(`201 Created • ${latency}ms`)
      setPostmanMockResponse(JSON.stringify(postResponseObj, null, 2))
      setQaLogs(prev => [
        ...prev,
        `POST ${baseUrl}/users | Status: 201 Created | Time: ${latency}ms`,
        "  ✔ Assertion: Status code is 201 (Created) - PASSED",
        "  ✔ Assertion: Response body returns newly created id - PASSED"
      ])
      setQaProgress(50)
      await new Promise(resolve => setTimeout(resolve, 1200))

      // 3. PUT Request (Pull)
      setPostmanMockStep(3)
      setPostmanMockMethod('PUT')
      setPostmanMockUrl(`${baseUrl}/users/1`)
      setPostmanMockStatus('Sending...')
      setPostmanMockResponse('{}')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      startTime = performance.now()
      let putResponseObj = { id: 1, name: "Aarav Mathur (Replaced)", username: "aarav_m", email: "mathuraarav2005@gmail.com" }
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(`${baseUrl}/users/1`, {
          method: 'PUT',
          body: JSON.stringify({ id: 1, name: "Aarav Mathur (Replaced)", username: "aarav_m", email: "mathuraarav2005@gmail.com" }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        putResponseObj = await res.json()
        latency = Math.round(performance.now() - startTime)
      } catch (e) {
        latency = Math.round(70 + Math.random() * 90)
      }
      setPostmanMockStatus(`200 OK • ${latency}ms`)
      setPostmanMockResponse(JSON.stringify(putResponseObj, null, 2))
      setQaLogs(prev => [
        ...prev,
        `PUT ${baseUrl}/users/1 | Status: 200 OK | Time: ${latency}ms`,
        "  ✔ Assertion: Status code is 200 (Success) - PASSED",
        "  ✔ Assertion: Entire user object replaced successfully - PASSED"
      ])
      setQaProgress(70)
      await new Promise(resolve => setTimeout(resolve, 1200))

      // 4. PATCH Request (Modify)
      setPostmanMockStep(4)
      setPostmanMockMethod('PATCH')
      setPostmanMockUrl(`${baseUrl}/users/1`)
      setPostmanMockStatus('Sending...')
      setPostmanMockResponse('{}')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      startTime = performance.now()
      let patchResponseObj = { id: 1, name: "Leanne Graham", username: "aarav_patch" }
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(`${baseUrl}/users/1`, {
          method: 'PATCH',
          body: JSON.stringify({ username: "aarav_patch" }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        patchResponseObj = await res.json()
        latency = Math.round(performance.now() - startTime)
      } catch (e) {
        latency = Math.round(55 + Math.random() * 80)
      }
      setPostmanMockStatus(`200 OK • ${latency}ms`)
      setPostmanMockResponse(JSON.stringify(patchResponseObj, null, 2))
      setQaLogs(prev => [
        ...prev,
        `PATCH ${baseUrl}/users/1 | Status: 200 OK | Time: ${latency}ms`,
        "  ✔ Assertion: Status code is 200 (Success) - PASSED",
        "  ✔ Assertion: Field 'username' modified to 'aarav_patch' - PASSED"
      ])
      setQaProgress(85)
      await new Promise(resolve => setTimeout(resolve, 1200))

      // 5. DELETE Request (Remove)
      setPostmanMockStep(5)
      setPostmanMockMethod('DELETE')
      setPostmanMockUrl(`${baseUrl}/users/1`)
      setPostmanMockStatus('Sending...')
      setPostmanMockResponse('{}')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      startTime = performance.now()
      let deleteResponseObj = { success: true, message: "Resource successfully deleted" }
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(`${baseUrl}/users/1`, {
          method: 'DELETE',
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        const text = await res.text()
        if (text) deleteResponseObj = JSON.parse(text)
        latency = Math.round(performance.now() - startTime)
      } catch (e) {
        latency = Math.round(60 + Math.random() * 90)
      }
      setPostmanMockStatus(`200 OK • ${latency}ms`)
      setPostmanMockResponse(JSON.stringify(deleteResponseObj, null, 2))
      setQaLogs(prev => [
        ...prev,
        `DELETE ${baseUrl}/users/1 | Status: 200 OK | Time: ${latency}ms`,
        "  ✔ Assertion: Status code is 200 (Success) - PASSED",
        "  ✔ Assertion: Resource deletion verified - PASSED",
        `🎉 SUCCESS: 5/5 API methods tested. 10/10 assertions verified [PASSED]!`
      ])
      setPostmanMockStep(6)
      setQaProgress(100)
      setQaTestStatus('success')
    } else if (qaActiveTab === 'jmeter') {
      const rawUrl = qaJmeterUrl.trim() || 'https://example.com'
      const targetUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `https://${rawUrl}`
      let hostname = 'example.com'
      try {
        hostname = new URL(targetUrl).hostname
      } catch (e) {
        hostname = targetUrl
      }

      setJmeterMockStep(1)
      setJmeterThreadCount(0)
      setJmeterRequestCount(0)
      setJmeterAvgLatency(0)
      setJmeterThroughput(0)

      setQaLogs([
        "⚡ Launching Apache JMeter Engine CLI...",
        `📂 Loading test plan profile config: thread_group_load.jmx`,
        `🔥 Preparing thread configurations targeting: ${targetUrl}`,
        "📈 Ramp-up phase: Initializing virtual threads [0 -> 100]..."
      ])
      setQaProgress(15)
      await new Promise(resolve => setTimeout(resolve, 800))

      const threadSteps = [10, 25, 50, 75, 100]
      const latencies: number[] = []

      for (let i = 0; i < threadSteps.length; i++) {
        const activeThreads = threadSteps[i]
        setJmeterThreadCount(activeThreads)
        
        const pingStart = performance.now()
        let sampleStatus = 'SUCCESS'
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 3000)
          await fetch(targetUrl, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
            signal: controller.signal
          })
          clearTimeout(timeoutId)
        } catch (e) {
          sampleStatus = 'SUCCESS (Opaque/Redirect)'
        }
        const pingEnd = performance.now()
        const sampleLatency = Math.max(5, Math.round(pingEnd - pingStart))
        latencies.push(sampleLatency)

        const currentRequests = (i + 1) * 350
        const currentThroughput = Math.round((currentRequests / ((i + 1) * 1.5)) * 10) / 10
        const avgL = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)

        setJmeterRequestCount(currentRequests)
        setJmeterAvgLatency(avgL)
        setJmeterThroughput(currentThroughput)

        setQaLogs(prev => [
          ...prev,
          `  [Thread Group A] Active Users: ${activeThreads} | Sample Requests: ${currentRequests} | Latency: ${sampleLatency}ms [Status: ${sampleStatus}]`
        ])
        setQaProgress(15 + Math.round(((i + 1) / threadSteps.length) * 70))
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      const minL = Math.min(...latencies)
      const maxL = Math.max(...latencies)
      const finalAvgL = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
      const finalThroughput = Math.round(1000 / finalAvgL * 50 * 10) / 10

      setJmeterThroughput(finalThroughput)
      setQaLogs(prev => [
        ...prev,
        `📊 Aggregating JMeter performance dashboard results:`,
        `  - Target Domain Host:      ${hostname}`,
        `  - Total Simulated Threads: 100 Virtual Users`,
        `  - Measured Latency Min:   ${minL}ms`,
        `  - Measured Latency Max:   ${maxL}ms`,
        `  - Measured Latency Avg:   ${finalAvgL}ms`,
        `  - Calculated Throughput:   ${finalThroughput} requests/sec`,
        `  - Transaction Error Rate:  0.00%`,
        `🧹 Tearing down performance test session and compiling CSV log metrics...`,
        `🎉 SUCCESS: JMeter performance tests finished. Host is stable under load!`
      ])
      setJmeterMockStep(2)
      setQaProgress(100)
      setQaTestStatus('success')
    }
  }

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
    "Kubernetes": "Orchestrated container cluster workloads, pod scaling schedules, and services mappings in multi-cloud configurations.",
    "Docker": "Used for containerizing web microservices. Created multi-stage Dockerfiles to minimize image sizes.",
    "Terraform": "Utilized Infrastructure as Code (IaC) templates to provision resources on Azure and AWS cloud setups.",
    "AWS": "Experience handling EC2 instances, S3 storage, IAM routing, and virtual networks.",
    "Azure": "Managed Azure virtual machines, resource groups, and storage interfaces for scalable deployments.",
    "Python": "Primary language for writing Selenium automation suites, API scripts, and scripting DevOps configurations.",
    "MySQL": "Relational database query tuning, table index configurations, and credentials setup.",
    "Jenkins": "Automated build execution, testing suites triggers, and notifications workflows in pipeline integrations.",
    "Linux": "Skilled in shell scripting (Bash), system diagnostics, permissions setups, and cron automated timers.",
    "GitHub": "Version control branching strategies, code integration checks, and runner secrets configuration.",
    "Ansible": "Configured configuration management playbooks to orchestrate package installs and services setup on host VMs.",
    "MongoDB": "NoSQL document aggregates, JSON payloads storage, and aggregation pipeline querying.",
    "Jira": "Sprint tracking, bug ticket workflows, test cycles mapping (Xray integration), and agile task board organization.",
    "Selenium": "Highly skilled in web automation using Selenium WebDriver in Python. Developed robust test suites, DOM selector routines, and responsive layout assertions.",
    "Postman": "REST API validation, writing response body check scripts, setting auth environments, and batch collections runners (Newman).",
    "JMeter": "Conducted load testing up to 1,000+ virtual users, analyzing request throughput, latencies, and service error curves.",
    "Appium": "Configured mobile test suites running on emulators to verify touch controls, responsive UI viewport shifts, and visual assets."
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
          { type: 'output', text: '  about        - Detailed summary of Aarav Mathur (with Email, GitHub, etc.)' },
          { type: 'output', text: '  skills       - Visual breakdown of technical & QA testing competencies' },
          { type: 'output', text: '  qa           - Simulate interactive QA test runs (Selenium, Postman, JMeter)' },
          { type: 'output', text: '  internships  - Chronological summary of internship experiences' },
          { type: 'output', text: '  certs        - View professional training & course certificates' },
          { type: 'output', text: '  contact      - Retrieve direct contact lines and social anchors' },
          { type: 'output', text: '  clear        - Clear the command interface' }
        )
        break
      case 'about':
        newHistory.push(
          { type: 'output', text: 'Aarav Mathur | DevOps & QA Automation Engineer' },
          { type: 'output', text: '------------------------------------------------------------' },
          { type: 'output', text: '📫 Email:      mathuraarav2005@gmail.com' },
          { type: 'output', text: '🔗 GitHub:     github.com/AaravMathur' },
          { type: 'output', text: '🔗 LinkedIn:   linkedin.com/in/aarav-mathur-514a62202' },
          { type: 'output', text: '📞 Phone:      +91 9887045678' },
          { type: 'output', text: '🎓 Education:  B.Tech CSE, Amity University Rajasthan (Class of 2026)' },
          { type: 'output', text: '📍 Location:   Jaipur, Rajasthan, India' },
          { type: 'output', text: '🚀 Focus:      QA Automation, CI/CD Pipeline Architectures, Performance Auditing' }
        )
        break
      case 'skills':
        newHistory.push(
          { type: 'output', text: 'Aarav\'s QA Automation & DevOps Competencies:' },
          { type: 'output', text: '============================================================' },
          { type: 'output', text: '🧪 QA & Testing:  Selenium (Python scripts), Postman, JMeter, Appium, Jira' },
          { type: 'output', text: '🚀 DevOps & CI/CD: Jenkins, Ansible, Docker, Kubernetes, Terraform' },
          { type: 'output', text: '☁️ Cloud & OS:    Microsoft Azure, AWS, Linux (Ubuntu/RHEL/CentOS)' },
          { type: 'output', text: '💾 DBs & Code:    MongoDB, MySQL, Python, Shell Scripting, C/C++' }
        )
        break
      case 'experience':
      case 'internships':
        newHistory.push(
          { type: 'output', text: 'Professional Internship Engagements:' },
          { type: 'output', text: '============================================================' },
          { type: 'output', text: '💼 Celebal Technologies | Remote DevOps Intern' },
          { type: 'output', text: '   Duration: June 2025 - Aug 2025' },
          { type: 'output', text: '   Work:     IaC configurations (Terraform) on Azure cloud, Docker building.' },
          { type: 'output', text: '' },
          { type: 'output', text: '💼 North Western Railways (NWR) | On-Site Developer Intern' },
          { type: 'output', text: '   Duration: June 2024 - Aug 2024' },
          { type: 'output', text: '   Work:     Introduced track repair requests tracking portal for General Manager.' }
        )
        break
      case 'certs':
      case 'certificates':
        newHistory.push(
          { type: 'output', text: 'Aarav\'s Tech Certifications & Professional Training:' },
          { type: 'output', text: '============================================================' },
          { type: 'output', text: '📜 Learn Selenium with Python, PyTest & Frameworks - Udemy (Jan 2026)' },
          { type: 'output', text: '📜 Python for Beginners Course - Udemy / Makeintern (Jan 2026)' },
          { type: 'output', text: '📜 DevOps Cloud Infrastructure Management & Operations - Celebal Tech (2025)' },
          { type: 'output', text: '📜 DevOps Integrated with AI Certificate - Coursera (Sept 2025)' },
          { type: 'output', text: '📜 Docker & Jenkins Course Certificate - Infosys (July 2025)' },
          { type: 'output', text: '📜 Complete DevOps Bootcamp - Udemy (July 2025)' },
          { type: 'output', text: '📜 Web Development Project Certification - NWR (May 2024)' },
          { type: 'output', text: '📜 C & C++ Programming Course Certificate - Swati Computers (Aug 2022)' }
        )
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
      case 'qa':
        newHistory.push(
          { type: 'output', text: '🧪 Initiating Simulated QA Test Suite...' },
          { type: 'output', text: '------------------------------------------------------------' },
          { type: 'output', text: '1. [Selenium] Headless Chrome web driver initialized successfully.' },
          { type: 'output', text: '   -> Navigating to target authentication portal...' },
          { type: 'output', text: '   -> Inputting elements: username, password.' },
          { type: 'output', text: '   -> Verifying dashboard redirect response: SUCCESS (UI checks passed)' },
          { type: 'output', text: '2. [Postman] Verifying API integrations & assertions...' },
          { type: 'output', text: '   -> GET /api/v1/health-check Status: 200 OK ResponseTime: 12ms' },
          { type: 'output', text: '   -> POST /api/v1/order Payload Assertion: PASSED' },
          { type: 'output', text: '3. [JMeter] Executing load performance test profile...' },
          { type: 'output', text: '   -> Spawning 50 threads with 5s ramp-up...' },
          { type: 'output', text: '   -> Average latency: 154ms, Error rate: 0.00%' },
          { type: 'output', text: '------------------------------------------------------------' },
          { type: 'output', text: '✅ All QA Automated test checks returned code 0 (Success).' },
          { type: 'output', text: '💡 Note: You can interactively run these test suites in the graphical' },
          { type: 'output', text: '   "Interactive QA & Test Automation Suite" dashboard below!' }
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
        "Executing: git commit -m 'feat: update testing coverage specs'",
        "Pushing commit to main branch...",
        "Webhook triggered Jenkins pipeline execution.",
        "✅ Stage 01: Code committed & tracked."
      ],
      [
        "Pipeline Step: Automated Testing & Verification Suite",
        "Executing: python selenium_tests.py",
        "Initializing Chrome headless Web Driver...",
        "Running UI login checks... SUCCESS",
        "Running track request submission checks... SUCCESS",
        "Executing API checks via Postman: newman run nwr_api.json",
        "GET /api/v1/requests: 200 OK (84ms) - Passed",
        "POST /api/v1/requests: 201 Created (112ms) - Passed",
        "Executing performance load tests: jmeter -n -t load_test.jmx",
        "Active Threads: 500 | Error Rate: 0.00% | Avg Latency: 92ms",
        "✅ Stage 02: All QA automation checks completed successfully. 100% assertions passed."
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
        "✅ Stage 03: Docker container packaged."
      ],
      [
        "Pipeline Step: Cloud Cluster Release Management",
        "Executing Ansible playbook: ansible-playbook deploy.yml",
        "TASK [Gathering Facts] *********************************************************",
        "TASK [Configure web servers in Azure Resource Group] ***************************",
        "changed: [azure-vm-node-1] => { 'status': 'updated' }",
        "changed: [azure-vm-node-2] => { 'status': 'updated' }",
        "TASK [Deploy container stack] **************************************************",
        "changed: [azure-vm-node-1] => { 'status': 'started' }",
        "✅ Stage 04: Azure deployment successful. Web service active."
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
            <a href="#qa" className="nav-link">QA Dashboard</a>
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
              Cloud Infrastructure, DevOps & QA Automation Engineer
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
              Specializing in building robust containerized pipelines, automating cloud provisioning, and implementing Infrastructure as Code. Passionate about Linux systems, Kubernetes orchestration, and competitive programming.
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-purple)' }}>8+</div>
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
            <a href="#qa" className="btn-secondary" style={{ borderColor: 'var(--accent-purple)' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--accent-purple)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Launch QA Suite</span>
            </a>
            <a href="#terminal" className="btn-secondary">
              <TerminalIcon />
              <span>Open Terminal</span>
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
          An interactive Linux-like interface simulating real-time queries for Aarav's configurations. Enter commands like <code style={{ color: 'var(--accent-purple)' }}>help</code>, <code style={{ color: 'var(--accent-cyan)' }}>skills</code>, <code style={{ color: 'var(--accent-green)' }}>internships</code>, or <code style={{ color: 'var(--accent-amber)' }}>certs</code>.
        </p>

        <div className="terminal-window">
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
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Learn Selenium with Python, PyTest & Frameworks</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Udemy (Pavan Kumar) | Jan 2026 | 46.5 Hours</div>
              </div>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Python for Beginners</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Udemy (Makeintern Course) | Jan 2026 | 2.5 Hours</div>
              </div>
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
          {/* QA & Automation Frameworks */}
          <div className="skill-category-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: '700' }}>
              <CodeIcon />
              <h4>QA & Automation Frameworks</h4>
            </div>
            <div className="skill-tags">
              {["Jira", "Selenium", "Postman", "JMeter", "Appium"].map(skill => (
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

          {/* DevOps & Cloud Platforms */}
          <div className="skill-category-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontWeight: '700' }}>
              <CloudIcon />
              <h4>DevOps & Cloud Platforms</h4>
            </div>
            <div className="skill-tags">
              {["Jenkins", "Ansible", "Azure", "AWS", "Docker", "Kubernetes", "Terraform", "Linux"].map(skill => (
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

          {/* Languages & Databases */}
          <div className="skill-category-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: '700' }}>
              <CpuIcon />
              <h4>Languages & Databases</h4>
            </div>
            <div className="skill-tags">
              {["Python", "MongoDB", "MySQL", "GitHub"].map(skill => (
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
          <h2>Interactive DevOps & QA Deployment Pipeline</h2>
        </div>
        <p className="section-subtitle">
          Trigger a simulated GitHub-to-Azure CI/CD workflow. Watch automated Selenium, Postman, and JMeter testing run before deploying container packages on cloud servers.
        </p>

        <div className="pipeline-container">
          {/* Step 1 */}
          <div className={`pipeline-step ${pipelineStepsStatus[0]} ${activePipelineStep === 0 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 01</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Git Commit</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[0] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[0] === 'success' ? '✔ Pushed' : activePipelineStep === 0 ? '⚙ Pushing...' : 'Pending'}
            </span>
            <div className="pipeline-connector"></div>
          </div>

          {/* Step 2 */}
          <div className={`pipeline-step ${pipelineStepsStatus[1]} ${activePipelineStep === 1 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 02</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>QA Testing</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[1] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[1] === 'success' ? '✔ Passed' : activePipelineStep === 1 ? '⚙ Testing...' : 'Locked'}
            </span>
            <div className="pipeline-connector"></div>
          </div>

          {/* Step 3 */}
          <div className={`pipeline-step ${pipelineStepsStatus[2]} ${activePipelineStep === 2 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 03</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Docker Build</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[2] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[2] === 'success' ? '✔ Packaged' : activePipelineStep === 2 ? '⚙ Building...' : 'Locked'}
            </span>
            <div className="pipeline-connector"></div>
          </div>

          {/* Step 4 */}
          <div className={`pipeline-step ${pipelineStepsStatus[3]} ${activePipelineStep === 3 ? 'running' : ''}`}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>STAGE 04</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Azure Deploy</h4>
            <span style={{ fontSize: '0.75rem', color: pipelineStepsStatus[3] === 'success' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              {pipelineStepsStatus[3] === 'success' ? '✔ Released' : activePipelineStep === 3 ? '⚙ Deploying...' : 'Locked'}
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

      {/* QA & Test Automation Suite Section */}
      <section className="section" id="qa">
        <div className="section-title">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2>Interactive QA & Test Automation Suite</h2>
        </div>
        <p className="section-subtitle">
          Aarav is expanding his skills into Quality Assurance (QA). Explore and run simulated testing scripts below for UI automation, API assertions, and performance load profiling.
        </p>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Tab Selection Row */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '16px', paddingBottom: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setQaActiveTab('selenium')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: qaActiveTab === 'selenium' ? '2px solid var(--accent-purple)' : '2px solid transparent',
                color: qaActiveTab === 'selenium' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: '600',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🧪 Selenium (UI Automation)
            </button>
            <button
              onClick={() => setQaActiveTab('postman')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: qaActiveTab === 'postman' ? '2px solid var(--accent-purple)' : '2px solid transparent',
                color: qaActiveTab === 'postman' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: '600',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📮 Postman (API Verification)
            </button>
            <button
              onClick={() => setQaActiveTab('jmeter')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: qaActiveTab === 'jmeter' ? '2px solid var(--accent-purple)' : '2px solid transparent',
                color: qaActiveTab === 'jmeter' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: '600',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📈 JMeter (Performance Benchmarks)
            </button>
          </div>

          {/* Test Controls & Runner Grid */}
          <div className="qa-grid-container">
            {/* Left Box: Test Information & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                  {qaActiveTab === 'selenium' ? 'Selenium Web UI WebDriver' : qaActiveTab === 'postman' ? 'Postman Newman Runner' : 'JMeter Load Testing Tool'}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {qaActiveTab === 'selenium' 
                    ? 'Simulate a headless browser launch executing functional UI checks for login state bindings and track diversion application workflows.'
                    : qaActiveTab === 'postman'
                    ? 'Verify RESTful API endpoints by running Newman scripts checking JSON payloads response bodies and HTTP status schemas.'
                    : 'Analyze host resource bottlenecks by launching a load benchmark scaling concurrent active HTTP connection threads.'
                  }
                </p>
              </div>

              {/* URL Input and Presets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span>🌐</span>
                  <span>{qaActiveTab === 'selenium' ? 'Test Website URL' : qaActiveTab === 'postman' ? 'API Endpoint URL' : 'Performance Target URL'}</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  style={{ padding: '10px 14px', fontSize: '0.85rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }}
                  value={
                    qaActiveTab === 'selenium'
                      ? qaSeleniumUrl
                      : qaActiveTab === 'postman'
                      ? qaPostmanUrl
                      : qaJmeterUrl
                  }
                  onChange={(e) => {
                    const val = e.target.value
                    if (qaActiveTab === 'selenium') setQaSeleniumUrl(val)
                    else if (qaActiveTab === 'postman') setQaPostmanUrl(val)
                    else setQaJmeterUrl(val)
                  }}
                  placeholder={
                    qaActiveTab === 'selenium'
                      ? 'https://example.com'
                      : qaActiveTab === 'postman'
                      ? 'https://jsonplaceholder.typicode.com/todos/1'
                      : 'https://example.com'
                  }
                  disabled={qaTestStatus === 'running'}
                />
                
                {/* Presets Row */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {qaActiveTab === 'selenium' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setQaSeleniumUrl('https://example.com')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        Example Domain
                      </button>
                      <button
                        type="button"
                        onClick={() => setQaSeleniumUrl('https://aaravmathur.github.io/Portfolio')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        This Portfolio
                      </button>
                      <button
                        type="button"
                        onClick={() => setQaSeleniumUrl('https://github.com')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        GitHub.com
                      </button>
                    </>
                  )}
                  {qaActiveTab === 'postman' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setQaPostmanUrl('https://jsonplaceholder.typicode.com/todos/1')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        Todo item (GET)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQaPostmanUrl('https://jsonplaceholder.typicode.com/posts/2')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        Post item (GET)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQaPostmanUrl('https://httpbin.org/get')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        HTTP Headers (GET)
                      </button>
                    </>
                  )}
                  {qaActiveTab === 'jmeter' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setQaJmeterUrl('https://example.com')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        Example.com
                      </button>
                      <button
                        type="button"
                        onClick={() => setQaJmeterUrl('https://jsonplaceholder.typicode.com')}
                        style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        disabled={qaTestStatus === 'running'}
                      >
                        JSONPlaceholder API
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Test Path Selector for Selenium */}
              {qaActiveTab === 'selenium' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    🛠️ Simulation Test Flow Path
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: seleniumTestOutcome === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-tertiary)', border: seleniumTestOutcome === 'success' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', transition: 'all 0.2s' }}>
                      <input
                        type="radio"
                        name="testOutcome"
                        value="success"
                        checked={seleniumTestOutcome === 'success'}
                        onChange={() => setSeleniumTestOutcome('success')}
                        disabled={qaTestStatus === 'running'}
                        style={{ accentColor: 'var(--accent-green)' }}
                      />
                      <span style={{ color: seleniumTestOutcome === 'success' ? 'var(--accent-green)' : 'inherit' }}>Success (Pass)</span>
                    </label>
                    <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: seleniumTestOutcome === 'failure' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-tertiary)', border: seleniumTestOutcome === 'failure' ? '1px solid var(--accent-red)' : '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', transition: 'all 0.2s' }}>
                      <input
                        type="radio"
                        name="testOutcome"
                        value="failure"
                        checked={seleniumTestOutcome === 'failure'}
                        onChange={() => setSeleniumTestOutcome('failure')}
                        disabled={qaTestStatus === 'running'}
                        style={{ accentColor: 'var(--accent-red)' }}
                      />
                      <span style={{ color: seleniumTestOutcome === 'failure' ? 'var(--accent-red)' : 'inherit' }}>Failure (Catch Bug)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Status details card */}
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Execution Status:</span>
                  <strong style={{ color: qaTestStatus === 'success' ? 'var(--accent-green)' : qaTestStatus === 'running' ? 'var(--accent-amber)' : qaTestStatus === 'failure' ? 'var(--accent-red)' : 'inherit' }}>
                    {qaTestStatus === 'success' ? '✔ PASSED' : qaTestStatus === 'running' ? '⚙ Running...' : qaTestStatus === 'failure' ? '❌ FAILED' : 'Ready'}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Target Engine:</span>
                  <strong>{qaActiveTab === 'selenium' ? 'Chrome WebDriver (Python)' : qaActiveTab === 'postman' ? 'Newman CLI (NodeJS)' : 'JMeter CLI (Java)'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Project Scope:</span>
                  <strong>{qaActiveTab === 'selenium' ? 'Web Interface Compliance' : qaActiveTab === 'postman' ? 'API Payload Assertions' : 'Load Testing benchmarks'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Jira Ticket Ref:</span>
                  <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--accent-cyan)' }}>{qaActiveTab === 'selenium' ? 'QA-382 (UI)' : qaActiveTab === 'postman' ? 'QA-419 (API)' : 'QA-502 (Perf)'}</span>
                </div>
              </div>

              <button
                onClick={runQaTestSuite}
                disabled={qaTestStatus === 'running'}
                className="btn-primary"
                style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
              >
                {qaTestStatus === 'running' ? 'Running Test Suites...' : 'Execute Test Suite'}
              </button>
            </div>

            {/* Right Box: Live Log Console Window & Browser Simulation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Log Console */}
              <div className="terminal-window">
                <div className="terminal-header" style={{ padding: '8px 12px' }}>
                  <div className="terminal-title">Runner: {qaActiveTab}_tests.log</div>
                  {qaProgress > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{qaProgress}%</span>}
                </div>
                {/* Progress bar overlay if running */}
                {qaTestStatus === 'running' && (
                  <div style={{ width: '100%', height: '2px', background: 'var(--border-color)', position: 'relative' }}>
                    <div style={{ width: `${qaProgress}%`, height: '100%', background: 'var(--accent-purple)', transition: 'width 0.2s ease' }}></div>
                  </div>
                )}
                <div className="terminal-body" style={{ height: '200px', padding: '12px', fontSize: '0.82rem', gap: '6px' }}>
                  {qaLogs.map((log, index) => (
                    <div key={index} className="terminal-line" style={{ color: log.startsWith('✔') || log.startsWith('🎉') || log.includes('SUCCESS') || log.includes('[PASSED]') ? 'var(--accent-green)' : log.startsWith('❌') || log.includes('[FAILED]') || log.includes('⚠️') || log.includes('AssertionError') || log.includes('exit code 1') ? 'var(--accent-red)' : log.startsWith('⚡') ? 'var(--accent-purple)' : 'inherit' }}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Browser Mockup (Only for Selenium UI Tab) */}
              {qaActiveTab === 'selenium' && (
                <div className="terminal-window" style={{ border: '1px solid var(--border-color)', background: '#f4f6f9', color: '#333' }}>
                  {/* Browser Window Header */}
                  <div style={{ background: '#e0e4ec', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #d0d4dc' }}>
                    {/* Window Controls */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
                    </div>
                    {/* Address bar */}
                    <div style={{ background: 'white', flex: 1, borderRadius: '4px', padding: '4px 10px', fontSize: '0.75rem', color: '#666', border: '1px solid #ccd0d8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🔒</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {seleniumCurrentStep === 0 ? 'about:blank' : 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'}
                      </span>
                    </div>
                  </div>

                  {/* Browser Page Viewport */}
                  <div style={{ height: '330px', background: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', fontFamily: '"Inter", sans-serif' }}>
                    {seleniumCurrentStep === 0 ? (
                      /* Idle Screen */
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center', color: '#777' }}>
                        <div style={{ fontSize: '2.5rem' }}>🌐</div>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#444' }}>Chromium Browser Session Offline</div>
                          <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>Click "Execute Test Suite" to boot Web Driver.</div>
                        </div>
                      </div>
                    ) : seleniumCurrentStep === 5 && seleniumTestOutcome === 'success' ? (
                      /* Dashboard Screen (Success) */
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', boxSizing: 'border-box', color: '#2c3e50' }}>
                        {/* Top bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#f35d0b' }}>OrangeHRM Dashboard</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(39, 201, 63, 0.1)', border: '1px solid #27c93f', borderRadius: '20px', padding: '2px 8px', fontSize: '0.7rem', color: '#27c93f', fontWeight: 'bold' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }}></span>
                            Welcome Admin
                          </div>
                        </div>
                        {/* Content Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                          <div style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '6px', padding: '10px' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6c757d' }}>Quick Launch</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                              <span style={{ fontSize: '0.7rem', color: '#0366d6' }}>📝 Leave List</span>
                              <span style={{ fontSize: '0.7rem', color: '#0366d6' }}>⏳ Timesheets</span>
                              <span style={{ fontSize: '0.7rem', color: '#0366d6' }}>👤 My Info</span>
                            </div>
                          </div>
                          <div style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '6px', padding: '10px', position: 'relative' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6c757d' }}>Time at Work</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '800', marginTop: '6px', color: '#333' }}>08h 12m</div>
                            <div style={{ fontSize: '0.65rem', color: '#28a745', marginTop: '2px' }}>Punched In</div>
                          </div>
                        </div>
                        {/* Assertion Rings */}
                        <div style={{ border: '1px dashed #27c93f', background: 'rgba(39, 201, 63, 0.05)', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#1e7e34', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>✔</span>
                          <strong>Assertion Checked:</strong> Dashboard elements loaded successfully.
                        </div>
                      </div>
                    ) : (
                      /* OrangeHRM Login Screen (Typing steps 1-4 and Failure State 5) */
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', boxSizing: 'border-box' }}>
                        {/* Logo */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '1.4rem' }}>🍊</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#222' }}>orange<span style={{ color: '#4caf50' }}>HRM</span></span>
                          </div>
                          <span style={{ fontSize: '0.55rem', letterSpacing: '0.5px', color: '#777', textTransform: 'uppercase' }}>Open Source HR Management</span>
                        </div>

                        {/* Login Container Box */}
                        <div style={{ width: '100%', maxWidth: '210px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {/* Fail Warning Alert */}
                          {seleniumCurrentStep === 5 && seleniumTestOutcome === 'failure' && (
                            <div style={{ background: '#fdf2f2', border: '1px solid #fde8e8', color: '#de350b', padding: '6px 8px', borderRadius: '4px', fontSize: '0.7rem', textAlign: 'center', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                              <span>⚠</span>
                              <span>Invalid credentials</span>
                            </div>
                          )}

                          {/* Credentials Hint Banner */}
                          <div style={{ background: '#eaedf2', padding: '6px 10px', borderRadius: '4px', fontSize: '0.68rem', color: '#4a5568' }}>
                            <div>Username : Admin</div>
                            <div>Password : admin123</div>
                          </div>

                          {/* Form Input fields */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ position: 'relative' }}>
                              <input
                                type="text"
                                value={seleniumUserVal}
                                placeholder="Username"
                                readOnly
                                style={{ width: '100%', padding: '6px 8px 6px 22px', fontSize: '0.75rem', border: seleniumCurrentStep === 2 ? '1px solid #f35d0b' : '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', outline: 'none', background: '#fafafa' }}
                              />
                              <span style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', opacity: '0.5' }}>👤</span>
                            </div>
                            <div style={{ position: 'relative' }}>
                              <input
                                type="password"
                                value={seleniumPassVal}
                                placeholder="Password"
                                readOnly
                                style={{ width: '100%', padding: '6px 8px 6px 22px', fontSize: '0.75rem', border: seleniumCurrentStep === 3 ? '1px solid #f35d0b' : '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', outline: 'none', background: '#fafafa' }}
                              />
                              <span style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', opacity: '0.5' }}>🔑</span>
                            </div>
                          </div>

                          {/* Submit button */}
                          <button
                            type="button"
                            style={{
                              background: seleniumCurrentStep === 4 ? '#d8520a' : '#f35d0b',
                              color: 'white',
                              border: 'none',
                              padding: '8px',
                              borderRadius: '4px',
                              fontWeight: 'bold',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              width: '100%',
                              transition: 'background 0.2s',
                              transform: seleniumCurrentStep === 4 ? 'scale(0.98)' : 'none'
                            }}
                          >
                            Login
                          </button>
                        </div>

                        {/* Footer text */}
                        <div style={{ fontSize: '0.55rem', color: '#888', textAlign: 'center' }}>
                          OrangeHRM OS 5.8 © 2005 - 2026 OrangeHRM, Inc.
                        </div>
                      </div>
                    )}

                    {/* Animated Mouse Cursor */}
                    {seleniumCurrentStep > 0 && seleniumCurrentStep < 5 && (
                      <div
                        style={{
                          position: 'absolute',
                          width: '14px',
                          height: '14px',
                          zIndex: 999,
                          pointerEvents: 'none',
                          fontSize: '1.2rem',
                          lineHeight: '1',
                          transition: 'all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          top:
                            seleniumCurrentStep === 1
                              ? '80%' // loading
                              : seleniumCurrentStep === 2
                              ? '45%' // username
                              : seleniumCurrentStep === 3
                              ? '53%' // password
                              : '67%', // button click (step 4)
                          left:
                            seleniumCurrentStep === 1
                              ? '80%'
                              : seleniumCurrentStep === 2
                              ? '48%'
                              : seleniumCurrentStep === 3
                              ? '48%'
                              : '52%'
                        }}
                      >
                        ↖️
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Visual Postman Mockup (Only for Postman Tab) */}
              {qaActiveTab === 'postman' && (
                <div className="terminal-window" style={{ border: '1px solid var(--border-color)', background: '#1c1e22', color: '#e0e4e8', fontFamily: '"Inter", sans-serif' }}>
                  {/* Postman Window Header */}
                  <div style={{ background: '#2d3139', padding: '6px 12px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', borderBottom: '1px solid #101216', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>🚀</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#aaa' }}>Postman API Client</span>
                    </div>
                    {/* Window Controls */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
                    </div>
                  </div>

                  {/* Postman Sub-Header Tab Bar */}
                  <div style={{ background: '#24282f', padding: '4px 12px', display: 'flex', gap: '6px', borderBottom: '1px solid #101216', fontSize: '0.7rem' }}>
                    <div style={{ background: '#1c1e22', borderBottom: 'none', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '6px', color: '#ff6c37', fontWeight: 'bold' }}>
                      <span>📄</span> JSONPlaceholder APIs
                    </div>
                  </div>

                  {/* Postman Workspace Split Panel */}
                  <div style={{ height: '330px', display: 'flex', flexDirection: 'row', background: '#1c1e22', overflow: 'hidden' }}>
                    {/* Left Sidebar Collections List */}
                    <div className="postman-sidebar" style={{ width: '25%', minWidth: '85px', borderRight: '1px solid #2d3139', background: '#181a1e', padding: '8px 4px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#888', paddingLeft: '4px', textTransform: 'uppercase', marginBottom: '4px' }}>Collection</div>
                      {[
                        { step: 1, m: 'GET', l: 'Fetch Users' },
                        { step: 2, m: 'POST', l: 'Create User' },
                        { step: 3, m: 'PUT', l: 'Update User' },
                        { step: 4, m: 'PATCH', l: 'Modify User' },
                        { step: 5, m: 'DELETE', l: 'Remove User' }
                      ].map(item => (
                        <div
                          key={item.step}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 6px',
                            borderRadius: '4px',
                            background: postmanMockStep === item.step ? 'rgba(255, 108, 55, 0.15)' : 'transparent',
                            border: postmanMockStep === item.step ? '1px solid rgba(255, 108, 55, 0.3)' : '1px solid transparent',
                            cursor: 'pointer',
                            fontSize: '0.65rem'
                          }}
                        >
                          <strong style={{
                            color:
                              item.m === 'GET' ? '#28a745' :
                              item.m === 'POST' ? '#f35d0b' :
                              item.m === 'PUT' ? '#007bff' :
                              item.m === 'PATCH' ? '#6f42c1' : '#dc3545',
                            fontSize: '0.55rem',
                            width: '24px'
                          }}>
                            {item.m}
                          </strong>
                          <span style={{ color: postmanMockStep === item.step ? '#fff' : '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.l}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Right Workspace Panel */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px', boxSizing: 'border-box', overflowY: 'auto' }}>
                      {postmanMockStep === 0 ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', color: '#888' }}>
                          <span style={{ fontSize: '2.5rem' }}>📮</span>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#ccc' }}>API Client Session Idle</div>
                            <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Click "Execute Test Suite" to run collection APIs.</div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                          {/* URL Bar row */}
                          <div style={{ display: 'flex', border: '1px solid #2d3139', borderRadius: '4px', overflow: 'hidden', background: '#181a1e' }}>
                            <div style={{
                              background: '#2d3139',
                              padding: '6px 12px',
                              fontSize: '0.75rem',
                              fontWeight: '800',
                              color:
                                postmanMockMethod === 'GET' ? '#28a745' :
                                postmanMockMethod === 'POST' ? '#f35d0b' :
                                postmanMockMethod === 'PUT' ? '#007bff' :
                                postmanMockMethod === 'PATCH' ? '#6f42c1' : '#dc3545'
                            }}>
                              {postmanMockMethod}
                            </div>
                            <input
                              type="text"
                              value={postmanMockUrl}
                              readOnly
                              style={{ flex: 1, background: 'transparent', border: 'none', color: '#e0e0e0', fontSize: '0.7rem', padding: '6px', outline: 'none' }}
                            />
                            <button
                              type="button"
                              style={{ background: '#007bff', color: '#fff', border: 'none', padding: '0 16px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', opacity: qaTestStatus === 'running' ? 0.7 : 1 }}
                            >
                              Send
                            </button>
                          </div>

                          {/* Headers/Params tab bar */}
                          <div style={{ display: 'flex', gap: '10px', fontSize: '0.65rem', color: '#888', borderBottom: '1px solid #2d3139', paddingBottom: '4px' }}>
                            <span>Params</span>
                            <span>Headers (3)</span>
                            <span style={{ color: '#ff6c37', borderBottom: '1px solid #ff6c37', paddingBottom: '4px' }}>Body (raw JSON)</span>
                          </div>

                          {/* Request Body Area if applicable */}
                          {(postmanMockMethod === 'POST' || postmanMockMethod === 'PUT' || postmanMockMethod === 'PATCH') && (
                            <div style={{ background: '#181a1e', border: '1px solid #2d3139', borderRadius: '4px', padding: '6px', fontSize: '0.65rem', color: '#4caf50', fontFamily: 'monospace', maxHeight: '55px', overflowY: 'auto', textAlign: 'left' }}>
                              {postmanMockMethod === 'POST' && `{ "name": "Aarav Mathur", "email": "mathuraarav...`}
                              {postmanMockMethod === 'PUT' && `{ "id": 1, "name": "Aarav Mathur (Replaced)"...}`}
                              {postmanMockMethod === 'PATCH' && `{ "username": "aarav_patch" }`}
                            </div>
                          )}

                          {/* Response Area */}
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #2d3139', paddingTop: '6px' }}>
                            {/* Response status meta row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                              <span style={{ fontWeight: 'bold', color: '#888' }}>Response</span>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#888' }}>Status:</span>
                                <span style={{ color: postmanMockStatus.includes('200') || postmanMockStatus.includes('201') ? '#28a745' : '#ffc107', fontWeight: 'bold' }}>
                                  {postmanMockStatus}
                                </span>
                              </div>
                            </div>
                            
                            {/* Response Body Text */}
                            <pre style={{ flex: 1, background: '#181a1e', border: '1px solid #2d3139', borderRadius: '4px', padding: '6px', margin: 0, fontSize: '0.65rem', color: '#66d9ef', fontFamily: 'monospace', overflowY: 'auto', textAlign: 'left', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                              {postmanMockResponse}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Visual JMeter Mockup (Only for JMeter Tab) */}
              {qaActiveTab === 'jmeter' && (
                <div className="terminal-window" style={{ border: '1px solid var(--border-color)', background: '#eaeaea', color: '#333', fontFamily: '"Segoe UI", sans-serif' }}>
                  {/* JMeter Header Bar */}
                  <div style={{ background: '#cfd8dc', padding: '4px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #b0bec5', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.85rem' }}>📊</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#37474f' }}>Apache JMeter (v5.6.3)</span>
                    </div>
                    {/* Mini Toolbar */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ cursor: 'pointer', fontSize: '0.85rem', opacity: jmeterMockStep === 1 ? 0.4 : 1 }} title="Start Run">▶️</span>
                      <span style={{ cursor: 'pointer', fontSize: '0.85rem', opacity: jmeterMockStep !== 1 ? 0.4 : 1 }} title="Stop Run">🛑</span>
                      <span style={{ cursor: 'pointer', fontSize: '0.85rem' }} title="Clear Logs">🧹</span>
                    </div>
                  </div>

                  {/* JMeter workspace body */}
                  <div style={{ height: '330px', display: 'flex', background: '#fff', overflow: 'hidden' }}>
                    {/* Left side plan tree hierarchy */}
                    <div className="jmeter-sidebar" style={{ width: '30%', borderRight: '1px solid #cfd8dc', background: '#f5f5f5', padding: '6px', fontSize: '0.65rem', boxSizing: 'border-box', textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', color: '#37474f', marginBottom: '6px' }}>Test Plan</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '8px' }}>
                        <span style={{ color: '#263238' }}>👥 Thread Group</span>
                        <span style={{ color: '#37474f', paddingLeft: '8px' }}>📡 HTTP Request Defaults</span>
                        <span style={{ color: '#37474f', paddingLeft: '8px' }}>🔌 HTTP Sampler (Ping)</span>
                        <span style={{ color: jmeterActiveView === 'Aggregate' ? '#1e88e5' : '#37474f', fontWeight: jmeterActiveView === 'Aggregate' ? 'bold' : 'normal', paddingLeft: '8px', cursor: 'pointer' }} onClick={() => setJmeterActiveView('Aggregate')}>
                          📊 Aggregate Report
                        </span>
                        <span style={{ color: jmeterActiveView === 'Graph' ? '#1e88e5' : '#37474f', fontWeight: jmeterActiveView === 'Graph' ? 'bold' : 'normal', paddingLeft: '8px', cursor: 'pointer' }} onClick={() => setJmeterActiveView('Graph')}>
                          📈 Graph Results
                        </span>
                      </div>
                    </div>

                    {/* Right side report metrics display */}
                    <div style={{ flex: 1, padding: '10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                      {/* Active view title bar */}
                      <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', borderBottom: '2px solid #b0bec5', paddingBottom: '4px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#37474f' }}>
                          {jmeterActiveView === 'Aggregate' ? 'Aggregate Stats Report' : 'Throughput / Latency Graph'}
                        </span>
                        {/* Tab switcher buttons inside app */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => setJmeterActiveView('Aggregate')}
                            style={{ fontSize: '0.6rem', padding: '2px 6px', background: jmeterActiveView === 'Aggregate' ? '#b0bec5' : '#eceff1', border: '1px solid #cfd8dc', borderRadius: '3px', cursor: 'pointer' }}
                          >
                            Table
                          </button>
                          <button
                            type="button"
                            onClick={() => setJmeterActiveView('Graph')}
                            style={{ fontSize: '0.6rem', padding: '2px 6px', background: jmeterActiveView === 'Graph' ? '#b0bec5' : '#eceff1', border: '1px solid #cfd8dc', borderRadius: '3px', cursor: 'pointer' }}
                          >
                            Graph
                          </button>
                        </div>
                      </div>

                      {jmeterMockStep === 0 ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', color: '#78909c' }}>
                          <span style={{ fontSize: '2.5rem' }}>📈</span>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#546e7a' }}>JMeter Thread Planner Ready</div>
                            <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Click "Execute Test Suite" to begin load benchmark.</div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
                          {/* Live thread configuration counts */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                            <div style={{ background: '#f5f5f5', border: '1px solid #cfd8dc', padding: '6px', borderRadius: '4px', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.6rem', color: '#546e7a', textTransform: 'uppercase' }}>Active Threads</div>
                              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e88e5' }}>{jmeterThreadCount} / 100</div>
                            </div>
                            <div style={{ background: '#f5f5f5', border: '1px solid #cfd8dc', padding: '6px', borderRadius: '4px', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.6rem', color: '#546e7a', textTransform: 'uppercase' }}>Throughput</div>
                              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2e7d32' }}>{jmeterThroughput} /s</div>
                            </div>
                            <div style={{ background: '#f5f5f5', border: '1px solid #cfd8dc', padding: '6px', borderRadius: '4px', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.6rem', color: '#546e7a', textTransform: 'uppercase' }}>Avg Latency</div>
                              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ef6c00' }}>{jmeterAvgLatency} ms</div>
                            </div>
                          </div>

                          {/* View Panel Content */}
                          {jmeterActiveView === 'Aggregate' ? (
                            /* Aggregate Table View */
                            <div style={{ flex: 1, border: '1px solid #cfd8dc', borderRadius: '4px', overflow: 'hidden' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.65rem', textAlign: 'left' }}>
                                <thead>
                                  <tr style={{ background: '#eceff1', borderBottom: '1px solid #cfd8dc' }}>
                                    <th style={{ padding: '4px 6px', color: '#37474f' }}>Label</th>
                                    <th style={{ padding: '4px 6px', color: '#37474f' }}># Samples</th>
                                    <th style={{ padding: '4px 6px', color: '#37474f' }}>Average</th>
                                    <th style={{ padding: '4px 6px', color: '#37474f' }}>Error %</th>
                                    <th style={{ padding: '4px 6px', color: '#37474f' }}>Throughput</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ borderBottom: '1px solid #cfd8dc' }}>
                                    <td style={{ padding: '4px 6px', fontWeight: 'bold' }}>HTTP Request (HEAD)</td>
                                    <td style={{ padding: '4px 6px' }}>{jmeterRequestCount}</td>
                                    <td style={{ padding: '4px 6px' }}>{jmeterAvgLatency} ms</td>
                                    <td style={{ padding: '4px 6px', color: '#2e7d32' }}>0.00%</td>
                                    <td style={{ padding: '4px 6px', color: '#2e7d32', fontWeight: 'bold' }}>{jmeterThroughput}/sec</td>
                                  </tr>
                                  <tr style={{ background: '#eceff1', fontWeight: 'bold' }}>
                                    <td style={{ padding: '4px 6px' }}>TOTAL</td>
                                    <td style={{ padding: '4px 6px' }}>{jmeterRequestCount}</td>
                                    <td style={{ padding: '4px 6px' }}>{jmeterAvgLatency} ms</td>
                                    <td style={{ padding: '4px 6px', color: '#2e7d32' }}>0.00%</td>
                                    <td style={{ padding: '4px 6px' }}>{jmeterThroughput}/sec</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            /* Live Animated Graph View (CSS visual bar plot) */
                            <div style={{ flex: 1, border: '1px solid #cfd8dc', borderRadius: '4px', padding: '8px', boxSizing: 'border-box', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#78909c' }}>
                                <span>Latency limit (500ms)</span>
                                <span>Avg: {jmeterAvgLatency}ms</span>
                              </div>
                              {/* Graph Container */}
                              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '10px', borderBottom: '1px solid #90a4ae', borderLeft: '1px solid #90a4ae', height: '100px', padding: '4px 10px', boxSizing: 'border-box' }}>
                                {/* Multi-threaded bars representing latency responses */}
                                {[
                                  { h: 30, color: '#4caf50', label: 'T10' },
                                  { h: 45, color: '#4caf50', label: 'T25' },
                                  { h: 65, color: '#8bc34a', label: 'T50' },
                                  { h: 80, color: '#ffc107', label: 'T75' },
                                  { h: Math.min(100, Math.max(10, Math.round((jmeterAvgLatency / 300) * 100))), color: '#ff9800', label: 'T100' }
                                ].map((bar, index) => (
                                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                                    <div
                                      style={{
                                        width: '100%',
                                        height: `${jmeterThreadCount >= (index === 0 ? 10 : index === 1 ? 25 : index === 2 ? 50 : index === 3 ? 75 : 100) ? bar.h : 0}%`,
                                        background: bar.color,
                                        borderRadius: '2px 2px 0 0',
                                        transition: 'height 0.8s ease-in-out'
                                      }}
                                    ></div>
                                    <span style={{ fontSize: '0.55rem', color: '#78909c', marginTop: '4px' }}>{bar.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
