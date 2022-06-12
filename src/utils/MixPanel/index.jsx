import mixpanel from 'mixpanel-browser';

export const InitMixPanel = () => {
  // console.log('Panel init');
  // a451362882107a390266d74722d995d0  --> live
  // dd91637dae495eb2bd6a6d7bc8e9ceb3  --> local
  // mixpanel.init('a451362882107a390266d74722d995d0');
};

export const mixPanelEvent = (eventName, data) => {
  // console.log('\n\n');
  // console.log('Event added');
  // console.log('Event Name:', eventName);
  // console.log('Event Data:', data);
  // mixpanel.track(eventName, data);
};

export const identity = id => {
  // mixpanel.identify(id);
};
export const setUserProfile = data => {
  // mixpanel.people.set(data);
};

export const Logout = () => {
  // console.log('\n\n LOGOUT OF MIX');
  // mixpanel.reset();
};

export const createAlias = async email => {
  // let id = await mixpanel.get_distinct_id();
  // console.log(mixpanel.get_distinct_id());
  // mixpanel.alias(email, id);
  // mixpanel.identify(email);
};
