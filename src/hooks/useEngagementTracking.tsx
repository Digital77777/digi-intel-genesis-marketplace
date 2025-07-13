import { useEffect, useRef, useCallback } from 'react';

interface EngagementEvent {
  event: string;
  timestamp: number;
  data?: any;
}

export const useEngagementTracking = () => {
  const scrollDepthRef = useRef(0);
  const timeOnPageRef = useRef(Date.now());
  const eventsRef = useRef<EngagementEvent[]>([]);

  const trackEvent = useCallback((event: string, data?: any) => {
    const eventData: EngagementEvent = {
      event,
      timestamp: Date.now(),
      data
    };
    
    eventsRef.current.push(eventData);
    
    // Log to console for development (in production, send to analytics service)
    console.log('Engagement Event:', eventData);
  }, []);

  const trackScroll = useCallback(() => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > scrollDepthRef.current) {
      scrollDepthRef.current = scrollPercent;
      
      // Track milestone scroll depths
      if (scrollPercent >= 25 && scrollPercent < 50) {
        trackEvent('scroll_depth_25');
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        trackEvent('scroll_depth_50');
      } else if (scrollPercent >= 75 && scrollPercent < 90) {
        trackEvent('scroll_depth_75');
      } else if (scrollPercent >= 90) {
        trackEvent('scroll_depth_90');
      }
    }
  }, [trackEvent]);

  const trackTimeOnPage = useCallback(() => {
    const timeSpent = Date.now() - timeOnPageRef.current;
    
    // Track time milestones (30s, 1m, 2m, 5m)
    if (timeSpent >= 30000 && timeSpent < 60000) {
      trackEvent('time_on_page_30s');
    } else if (timeSpent >= 60000 && timeSpent < 120000) {
      trackEvent('time_on_page_1m');
    } else if (timeSpent >= 120000 && timeSpent < 300000) {
      trackEvent('time_on_page_2m');
    } else if (timeSpent >= 300000) {
      trackEvent('time_on_page_5m');
    }
  }, [trackEvent]);

  useEffect(() => {
    // Track page view
    trackEvent('page_view');

    // Set up scroll tracking
    window.addEventListener('scroll', trackScroll, { passive: true });

    // Set up time tracking interval
    const timeInterval = setInterval(trackTimeOnPage, 10000); // Check every 10 seconds

    return () => {
      window.removeEventListener('scroll', trackScroll);
      clearInterval(timeInterval);
      
      // Track session end
      const finalTimeSpent = Date.now() - timeOnPageRef.current;
      trackEvent('session_end', { 
        timeSpent: finalTimeSpent,
        maxScrollDepth: scrollDepthRef.current,
        totalEvents: eventsRef.current.length
      });
    };
  }, [trackScroll, trackTimeOnPage, trackEvent]);

  return {
    trackEvent,
    getSessionData: () => ({
      timeSpent: Date.now() - timeOnPageRef.current,
      scrollDepth: scrollDepthRef.current,
      events: eventsRef.current
    })
  };
};