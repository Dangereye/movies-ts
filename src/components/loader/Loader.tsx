import BodyText from '../typography/BodyText';
import { ImSpinner2 } from 'react-icons/im';

export default function LoaderComponent() {
  return (
    <div className='loader'>
      <div className='loader__spinner'>
        <ImSpinner2 />
        <BodyText text='Updating, one moment please...' />
      </div>
    </div>
  );
}
