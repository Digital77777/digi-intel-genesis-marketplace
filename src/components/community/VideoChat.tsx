
import { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneCall, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoChatProps {
  roomId: string;
  participants: Array<{ id: string; name: string; avatar?: string }>;
}

const VideoChat = ({ roomId, participants }: VideoChatProps) => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsVideoOn(true);
      setIsAudioOn(true);
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
    }
  };

  const stopVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    setIsVideoOn(false);
    setIsAudioOn(false);
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const joinCall = async () => {
    await startVideo();
    setIsInCall(true);
  };

  const leaveCall = () => {
    stopVideo();
    setIsInCall(false);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Live Video Chat
          <span className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {participants.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {isVideoOn ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <VideoOff className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-75">Camera is off</p>
              </div>
            </div>
          )}
          
          {/* Participant thumbnails */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {participants.slice(0, 3).map((participant) => (
              <div key={participant.id} className="w-16 h-12 bg-gray-700 rounded border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">{participant.name.charAt(0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {!isInCall ? (
            <Button onClick={joinCall} className="bg-green-600 hover:bg-green-700">
              <PhoneCall className="h-4 w-4 mr-2" />
              Join Call
            </Button>
          ) : (
            <>
              <Button
                variant={isVideoOn ? "secondary" : "outline"}
                size="sm"
                onClick={toggleVideo}
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              <Button
                variant={isAudioOn ? "secondary" : "outline"}
                size="sm"
                onClick={toggleAudio}
              >
                {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={leaveCall}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Participants ({participants.length})</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs">{participant.name.charAt(0)}</span>
                </div>
                <span>{participant.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoChat;
