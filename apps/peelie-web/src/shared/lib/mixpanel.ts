import mixpanel from 'mixpanel-browser';

mixpanel.init(`${import.meta.env.VITE_MIXPANEL_TOKEN}`, {
  autocapture: true,
  record_sessions_percent: 100,
  debug: true,
});

export const trackEvent = (event: string, props?: Record<string, unknown>) => {
  mixpanel.track(event, props);
};

export { mixpanel };
