import { utils, BigNumber } from 'ethers';
import React from 'react';
import { EventEmitter } from 'stream';
import NetworkConfigInterface from '../../../../smart-contract/lib/NetworkConfigInterface';

interface Props {
  networkConfig: NetworkConfigInterface;
  maxSupply: number;
  setError(error: any): void; 
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isMintEnabled: boolean;
  isWhitelistMintEnabled: boolean;
  isPremintlistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  backerMint(courseTokenId: number, amount: number): Promise<void>;
  whitelistMintTokens(mintAmount: number, whitelistTokenId: number): Promise<void>;
  premintlistMintTokens(mintAmount: number): Promise<void>;
}

interface State {
  amount: number;
  courseTokenId: number;
  whitelistTokenId: number;
}

const defaultState: State = {
  amount: 0.01,
  courseTokenId: 0,
  whitelistTokenId: 0,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMintAmount = this.handleChangeMintAmount.bind(this);
    this.handleChangeCourseTokenId = this.handleChangeCourseTokenId.bind(this);
  }

  handleChange(event: { target: { value: any; }; }) {
    this.props.setError(undefined);
    this.setState({
      amount: this.state.amount,
      courseTokenId: this.state.courseTokenId,
      whitelistTokenId: event.target.value,
    });
  }

  handleChangeMintAmount(event: { target: { value: any; }; }) {
    this.props.setError(undefined);
    this.setState({
      amount:  event.target.value,
      courseTokenId: this.state.courseTokenId,
      whitelistTokenId: this.state.whitelistTokenId,
    });
  }

  handleChangeCourseTokenId(event: { target: { value: any; }; }) {
    this.props.setError(undefined);
    this.setState({
      amount: this.state.amount,
      courseTokenId: event.target.value,
      whitelistTokenId: this.state.whitelistTokenId,
    });
  }

  
  private canMint(): boolean {
    return this.props.isMintEnabled;
  }

  private canWhitelistMint(): boolean {
    /** return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist; */
    return this.props.isWhitelistMintEnabled;
  }

  private canPremintlistMint(): boolean {
    /** return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist; */
    return this.props.isPremintlistMintEnabled;
  }

  private incrementMintAmount(): void {
  }

  private decrementMintAmount(): void {
  }

  private async mint(): Promise<void> {
    
    if (this.props.isMintEnabled) {
      await this.props.backerMint(this.state.courseTokenId, this.state.amount);
      return ;
    }
    //await this.props.whitelistMintTokens(this.state.mintAmount, this.state.whitelistTokenId);
    return ;
  }

  render() {
    let itera1 = 1;
    return (
      <>
        {this.canMint() ?
          <div className="mint-widget">
            <div className="price">
              <strong>Total price:</strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.amount))} {this.props.networkConfig.symbol}
            </div>

            <div className="controls form-contact">
                <>
                <label className='mint_label'>Provide course ID:</label><br/>
                <input type='text' placeholder='Course ID' size={10} maxLength={10} id="course-id" onChange={this.handleChangeCourseTokenId} />
                </>
            </div>
            <div className="controls form-contact">
                <>
                <label className='mint_label'>Provide the amount you wan to back or support (ETH):</label><br/>
                <input type='text' placeholder='Backing amount' size={10} maxLength={10} id="mint-amount" onChange={this.handleChangeMintAmount} />
                </>
                <button className="tf-button-st2 btn-effect" onClick={() => this.mint()}><span className="effect">Mint</span></button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            
            {this.props.isWhitelistMintEnabled ? <>You are not included in the <strong>whitelist</strong>.</> : <>The contract is <strong>paused</strong>.</>}<br />
            Please come back during stage!
          </div>
        }
      </>
    );
  }
}
