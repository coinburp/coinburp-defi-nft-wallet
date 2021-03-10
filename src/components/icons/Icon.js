import React from 'react';
import { Flex } from '../layout';
import { Emoji } from '../text';

import ApplePayIcon from './svg/ApplePayIcon';
import ArrowBackIcon from './svg/ArrowBack';
import ArrowCircledIcon from './svg/ArrowCircledIcon';
import ArrowIcon from './svg/ArrowIcon';
import { ArrowSmall } from './svg/ArrowSmall';
import AvatarIcon from './svg/AvatarIcon';
import BackIcon from './svg/BackIcon';
import BackspaceIcon from './svg/BackspaceIcon';
import CameraIcon from './svg/CameraIcon';
import CaretIcon from './svg/CaretIcon';
import CaretThickIcon from './svg/CaretThickIcon';
import CaretThinIcon from './svg/CaretThinIcon';
import ChartIcon from './svg/ChartIcon';
import CheckIcon from './svg/CheckIcon';
import CheckmarkCircledIcon from './svg/CheckmarkCircledIcon';
import CheckmarkIcon from './svg/CheckmarkIcon';
import ClearInputIcon from './svg/ClearInputIcon';
import ClockIcon from './svg/ClockIcon';
import CloseCircledIcon from './svg/CloseCircledIcon';
import CloseIcon from './svg/CloseIcon';
import CompassIcon from './svg/CompassIcon';
import ConnectWaveIcon from './svg/ConnectWaveIcon';
import CopyIcon from './svg/CopyIcon';
import CopySolidIcon from './svg/CopySolidIcon';
import CrosshairIcon from './svg/CrosshairIcon';
import DepositIconSmall from './svg/DepositIconSmall';
import DotIcon from './svg/DotIcon';
import DoubleCaretIcon from './svg/DoubleCaretIcon';
import EmojiActivitiesIcon from './svg/EmojiActivitiesIcon';
import EmojiAnimalsIcon from './svg/EmojiAnimalsIcon';
import EmojiFlagsIcon from './svg/EmojiFlagsIcon';
import EmojiFoodIcon from './svg/EmojiFoodIcon';
import EmojiObjectsIcon from './svg/EmojiObjectsIcon';
import EmojiRecentIcon from './svg/EmojiRecentIcon';
import EmojiSmileysIcon from './svg/EmojiSmileysIcon';
import EmojiSymbolsIcon from './svg/EmojiSymbolsIcon';
import EmojiTravelIcon from './svg/EmojiTravelIcon';
import FaceIdIcon from './svg/FaceIdIcon';
import FatArrowIcon from './svg/FatArrowIcon';
import GearIcon from './svg/GearIcon';
import GuideIcon from './svg/GuideIcon';
import HandleIcon from './svg/HandleIcon';
import Heart from './svg/Heart';
import HiddenIcon from './svg/HiddenIcon';
import ImportIcon from './svg/ImportIcon';
import InboxIcon from './svg/InboxIcon';
import InfoIcon from './svg/InfoIcon';
import LinkIcon from './svg/LinkIcon';
import LockIcon from './svg/LockIcon';
import MinusCircledIcon from './svg/MinusCircledIcon';
import OfflineIcon from './svg/OfflineIcon';
import PasscodeIcon from './svg/PasscodeIcon';
import PinIcon from './svg/PinIcon';
import PlusCircledIcon from './svg/PlusCircledIcon';
import PlusIcon from './svg/PlusIcon';
import ProgressIcon from './svg/ProgressIcon';
import QRCodeIcon from './svg/QRCodeIcon';
import QRIcon from './svg/QRIcon';
import Scan from './svg/Scan';
import ScannerIcon from './svg/ScannerIcon';
import SearchIcon from './svg/SearchIcon';
import SendIcon from './svg/SendIcon';
import SendSmallIcon from './svg/SendSmallIcon';
import SettingsGearIcon from './svg/SettingsGearIcon';
import ShareIcon from './svg/ShareIcon';
import SignatureIcon from './svg/SignatureIcon';
import SpinnerIcon from './svg/SpinnerIcon';
import StarIcon from './svg/StarIcon';
import SwapCircleIcon from './svg/SwapCircleIcon';
import SwapIcon from './svg/SwapIcon';
import ThreeDotsIcon from './svg/ThreeDotsIcon';
import TouchIdIcon from './svg/TouchIdIcon';
import WalletConnectIcon from './svg/WalletConnectIcon';
import WarningCircledIcon from './svg/WarningCircledIcon';
import WithdrawArrowIcon from './svg/WithdrawArrowIcon';
import WithdrawIconSmall from './svg/WithdrawIconSmall';

import {
  BackupIcon,
  CloudIcon,
  DollarIcon,
  MoonIcon,
  PencilIcon,
  RingIcon,
  SpeakerIcon,
  UserIcon,
  WarningIcon,
} from './svg/seetings';

const IconTypes = {
  applePay: ApplePayIcon,
  arrow: ArrowIcon,
  arrowBack: ArrowBackIcon,
  arrowCircled: ArrowCircledIcon,
  arrowSmall: ArrowSmall,
  avatar: AvatarIcon,
  backspace: BackspaceIcon,
  backup: BackupIcon,
  camera: CameraIcon,
  caret: CaretIcon,
  caretThick: CaretThickIcon,
  caretThin: CaretThinIcon,
  chart: ChartIcon,
  check: CheckIcon,
  checkmark: CheckmarkIcon,
  checkmarkCircled: CheckmarkCircledIcon,
  clearInput: ClearInputIcon,
  clock: ClockIcon,
  close: CloseIcon,
  closeCircled: CloseCircledIcon,
  cloud: CloudIcon,
  compass: CompassIcon,
  connectWave: ConnectWaveIcon,
  copy: CopyIcon,
  copySolid: CopySolidIcon,
  crosshair: CrosshairIcon,
  depositIconSmall: DepositIconSmall,
  dollar: DollarIcon,
  dot: DotIcon,
  doubleCaret: DoubleCaretIcon,
  emojiActivities: EmojiActivitiesIcon,
  emojiAnimals: EmojiAnimalsIcon,
  emojiFlags: EmojiFlagsIcon,
  emojiFood: EmojiFoodIcon,
  emojiObjects: EmojiObjectsIcon,
  emojiRecent: EmojiRecentIcon,
  emojiSmileys: EmojiSmileysIcon,
  emojiSymbols: EmojiSymbolsIcon,
  emojiTravel: EmojiTravelIcon,
  faceid: FaceIdIcon,
  fatArrow: FatArrowIcon,
  fingerprint: TouchIdIcon,
  gear: GearIcon,
  guide: GuideIcon,
  handle: HandleIcon,
  heart: Heart,
  hidden: HiddenIcon,
  import: ImportIcon,
  inbox: InboxIcon,
  info: InfoIcon,
  link: LinkIcon,
  lock: LockIcon,
  minusCircled: MinusCircledIcon,
  moon: MoonIcon,
  offline: OfflineIcon,
  passcode: PasscodeIcon,
  pencil: PencilIcon,
  pin: PinIcon,
  plus: PlusIcon,
  plusCircled: PlusCircledIcon,
  progress: ProgressIcon,
  qrCode: QRCodeIcon,
  qrIcon: QRIcon,
  ring: RingIcon,
  scan: Scan,
  scanBack: BackIcon,
  scanner: ScannerIcon,
  search: SearchIcon,
  send: SendIcon,
  sendSmall: SendSmallIcon,
  settingsGear: SettingsGearIcon,
  share: ShareIcon,
  signature: SignatureIcon,
  speaker: SpeakerIcon,
  spinner: SpinnerIcon,
  star: StarIcon,
  sunflower: Emoji,
  swap: SwapIcon,
  swapCircle: SwapCircleIcon,
  threeDots: ThreeDotsIcon,
  touchid: TouchIdIcon,
  user: UserIcon,
  walletConnect: WalletConnectIcon,
  warning: WarningIcon,
  warningCircled: WarningCircledIcon,
  withdrawIcon: WithdrawArrowIcon,
  withdrawIconSmall: WithdrawIconSmall,
};

const Icon = ({ name, testID, ...props }, ref) => {
  const IconElement = IconTypes[name] || Flex;
  const { colors } = useTheme();
  return (
    <IconElement
      {...props}
      colors={colors}
      name={name}
      ref={ref}
      testID={testID}
    />
  );
};

export default React.forwardRef(Icon);
