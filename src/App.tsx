import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import RollingSubtitles from './components/RollingSubtitles'
import PrueBlock from './components/PrueBlock'

function App() {
  const [progress, setProgress] = useState(0) // Header进度
  const [activeTab, setActiveTab] = useState(0) // 头部tabs的焦点索引
  
  return (
    <>
      <Header progress={progress} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <RollingSubtitles setProgress={setProgress} setActiveTab={setActiveTab}/>
      <div className='block' style={{background:'#ccc'}}></div>
      <div className='block' style={{background:'yellow'}}></div>
      <PrueBlock setActiveTab={setActiveTab} />
    </>
  )
}

export default App
