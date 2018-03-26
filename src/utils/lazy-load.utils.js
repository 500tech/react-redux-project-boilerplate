// TODO: remove if no need for Lazy load routes:
import Loadable from 'react-loadable';
import Loading from 'sample/loading';
const lazyLoad = loader =>
  Loadable({
    loader,
    loading: Loading
  });

export default lazyLoad;
