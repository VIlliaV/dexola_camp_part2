import stru from '../../images/STRU.webp';
import stru2x from '../../images/STRU@2x.webp';
import struDef from '../../images/STRU.jpg';

const Wallet = () => {
  return (
    <div>
      <div>
        <picture>
          <source srcSet={`${stru} 1x, ${stru2x} 2x`} type="image/webp" />
          <img src={`${struDef}`} alt="STRU" />
        </picture>
        <p> </p>
      </div>
      <div></div>
    </div>
  );
};

export default Wallet;
