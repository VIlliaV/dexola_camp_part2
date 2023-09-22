import {
  OperationInfo,
  OperationStatusStyled,
  SpanStyled,
  SvgError,
  SvgPending,
  SvgSuccess,
} from './OperationStatus.styled';

const OperationStatus = ({ stake, media, statusStake }) => {
  console.log('🚀 ~ stake:', stake);
  // console.log('🚀 ~ status:', status);
  // const status = 'success';

  const unit = 'STRU';

  return (
    <OperationStatusStyled $media={media}>
      {statusStake === 'loading' ? (
        <>
          <SvgPending />
          <OperationInfo>
            Adding{' '}
            <SpanStyled>
              {stake} {unit}
            </SpanStyled>{' '}
            to Staking
          </OperationInfo>
        </>
      ) : statusStake === 'success' ? (
        <>
          <SvgSuccess />
          <OperationInfo>
            <SpanStyled>
              {stake} {unit}{' '}
            </SpanStyled>
            successfully <br />
            added to Staking
          </OperationInfo>
        </>
      ) : statusStake === 'error' ? (
        <>
          <SvgError />
          <OperationInfo>
            <SpanStyled>Connection Error </SpanStyled>
            <br />
            Please try again
          </OperationInfo>
        </>
      ) : (
        <></>
      )}
    </OperationStatusStyled>
  );
};

export default OperationStatus;
