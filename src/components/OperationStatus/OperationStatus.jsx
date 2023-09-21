import {
  OperationInfo,
  OperationStatusStyled,
  SpanStyled,
  SvgError,
  SvgPending,
  SvgSuccess,
} from './OperationStatus.styled';

const OperationStatus = ({ stake, media }) => {
  const status = 'success';

  const unit = 'STRU';

  return (
    <OperationStatusStyled $media={media}>
      {status === 'pending' ? (
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
      ) : status === 'success' ? (
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
      ) : (
        <>
          <SvgError />
          <OperationInfo>
            <SpanStyled>Connection Error </SpanStyled>
            <br />
            Please try again
          </OperationInfo>
        </>
      )}
    </OperationStatusStyled>
  );
};

export default OperationStatus;
