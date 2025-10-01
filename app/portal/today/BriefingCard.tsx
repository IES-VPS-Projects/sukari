"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause } from "lucide-react"

// Transcript data for the audio briefing
const transcriptData = [
  { time: 0, text: "Overview: This briefing summarizes key developments in Kenya's sugar sector from July 26 to August 2, 2025, based on recent government announcements, market trends, and stakeholder reports." },
  { time: 10, text: "The sector shows signs of recovery amid ongoing reforms, with emphasis on production revival, pricing adjustments, and reduced import dependency. " },
  { time: 20, text: "No major disruptions reported this week, but focus remains on mill efficiencies and farmer payments. " },
  { time: 30, text: "Production and Milling Updates. Sugarcane deliveries and mill operations continue to improve under recent leasing agreements. Nzoia Sugar Company, leased to West Kenya Sugar Co. earlier in 2025, cleared KSh 1.5 billion in debt and disbursed Sh300M to farmers, contributing to a reported 66% production increase year-over-year." },
  { time: 40, text: "Chemelil Sugar Mill achieved timely farmer payments within one week, a shift from historical delays, supporting broader sector momentum toward self-sufficiency." },
  { time: 50, text: "Stakeholder sentiment is largely positive: 78% of farmers are optimistic, driven by a cane price hike to KSh5,750 per tonne and a KSh150 million bonus for Mumias farmers, a first for the sector. Mill operators are 85% positive, buoyed by reforms like the Sugar Act 2024. Field officers, at 92% positive, praise the new digital reporting system, with one Nyanza officer noting it 'has improved efficiency significantly.'" },
  { time: 60, text: "Dealers remain 65% neutral, cautious about market stability due to import challenges." },
  { time: 70, text: "Two recent headlines highlight progress and challenges. In Kakamega, a new digital cane tracking system at Butali Sugar Mills has cut delivery delays by 30%, ensuring farmers are paid within seven days, a game-changer for local growers." },
  { time: 80, text: "Meanwhile, in Mumias, a 15% production drop has raised concerns, prompting a Kenya Sugar Board order to halt milling for three months from July 14, 2025, to address immature cane harvesting. " },         
  { time: 90, text: "This affects key mills like Mumias, Butali, and Nzoia, with a cane survey planned to stabilize supply." },    
  { time: 100, text: "That concludes today's briefing. Stay updated with the latest developments through your dashboard." },
  { time: 110, text: "Thank you for listening. Stay tuned for more updates on the sugar sector." }  
];

export default function BriefingCard() {
  // Audio state and logic
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(typeof window !== 'undefined' ? new Audio('/court.mp3') : null)
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0)
  const [audioTime, setAudioTime] = useState(0)

  const handleAudioPlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => setIsPlaying(false))
      return () => {
        audio.removeEventListener('ended', () => setIsPlaying(false))
      }
    }
  }, [audio])

  useEffect(() => {
    if (audio && isPlaying) {
      const updateTranscript = () => {
        const currentTime = audio.currentTime
        setAudioTime(currentTime)

        let currentSegment = -1
        for (let i = 0; i < transcriptData.length; i++) {
          const segment = transcriptData[i]
          const nextSegment = transcriptData[i + 1]
          if (currentTime >= segment.time && (!nextSegment || currentTime < nextSegment.time)) {
            currentSegment = i
            break
          }
        }
        if (currentSegment !== -1 && currentSegment !== currentTranscriptIndex) {
          setCurrentTranscriptIndex(currentSegment)
        }
      }

      const interval = setInterval(updateTranscript, 100)
      return () => clearInterval(interval)
    }
  }, [audio, isPlaying, currentTranscriptIndex])

  const getCurrentTranscriptLines = () => {
    if (currentTranscriptIndex < transcriptData.length) {
      const segment = transcriptData[currentTranscriptIndex]
      const progress = Math.min((audioTime - segment.time) / 8, 1) // 8 seconds per segment
      const textLength = Math.floor(segment.text.length * progress)

      return [{
        text: segment.text.substring(0, textLength),
        isActive: true,
        isComplete: progress >= 1
      }]
    }
    return [{ text: "...", isActive: false, isComplete: false }]
  }

  // Auto-scroll effect for transcript
  useEffect(() => {
    const transcriptContainer = document.getElementById('transcript-container')
    if (transcriptContainer && isPlaying) {
      transcriptContainer.scrollTop = transcriptContainer.scrollHeight
    }
  }, [currentTranscriptIndex, audioTime, isPlaying])

  return (
    <div>
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden rounded-[24px] shadow-lg border-0" style={{ height: "100%" }}>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h3 className="font-semibold text-xl">Briefing</h3>
              <p className="text-sm text-gray-300">August 5th • 3 min</p>
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 h-15">
            <div className="flex items-end gap-1">
              {Array.from({ length: 50 }, (_, i) => (
                <div
                  key={i}
                  className={`rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{
                    width: "3px",
                    height: `${Math.random() * 10 + 10}px`,
                    backgroundColor: isPlaying ? '#10B981' : '#6B7280',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Audio Progress */}
          {audio && (
            <div className="mb-4">
              <Progress 
                value={audio.duration ? (audio.currentTime / audio.duration) * 100 : 0} 
                className="h-1 bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{Math.floor(audio.currentTime || 0)}s</span>
                <span>{Math.floor(audio.duration || 0)}s</span>
              </div>
            </div>
          )}
          
          {/* Transcript Display */}
          <div id="transcript-container" className="mb-6 h-6 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide">
            <div className="transition-all duration-300">
              {getCurrentTranscriptLines().map((line, index) => (
                <p 
                  key={index} 
                  className={`text-xs leading-relaxed transition-all duration-300 ${
                    line.isActive 
                      ? 'text-green-400' 
                      : line.isComplete 
                        ? 'text-gray-400' 
                        : 'text-gray-300'
                  }`}
                >
                  {line.text}
                  {line.isActive && <span className="animate-pulse">|</span>}
                </p>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleAudioPlay}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-3"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Play now
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
