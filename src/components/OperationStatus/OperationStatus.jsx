import {
  OperationInfo,
  OperationStatusStyled,
  SpanStyled,
  SvgError,
  SvgPending,
  SvgSuccess,
} from './OperationStatus.styled';

const OperationStatus = ({ media }) => {
  console.log('🚀 ~ media:', media);
  const status = 'success';
  const value = 99.9;
  const unit = 'TEST';

  return (
    <OperationStatusStyled $media={media}>
      {status === 'pending' ? (
        <>
          <SvgPending />
          <OperationInfo>
            Adding{' '}
            <SpanStyled>
              {value} {unit}
            </SpanStyled>{' '}
            to Staking
          </OperationInfo>
        </>
      ) : status === 'success' ? (
        <>
          <SvgSuccess />
          <OperationInfo>
            <SpanStyled>
              {value} {unit}{' '}
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
