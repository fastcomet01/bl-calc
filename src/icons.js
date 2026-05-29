import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const defaultStroke = '#000';
const defaultStrokeWidth = 1.6;

export const FoodIcon = ({ size = 16, color = defaultStroke }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M5 4v5a3 3 0 006 0V4M8 4v16M13 12c0 2 1 3 3 3V4c-2 0-3 1-3 3v5z"
      stroke={color}
      strokeWidth={defaultStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TransportIcon = ({ size = 16, color = defaultStroke }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M3 12l2-5h10l2 5M5 12h10v3H5z"
      stroke={color}
      strokeWidth={defaultStrokeWidth}
      strokeLinejoin="round"
    />
    <Circle cx="7" cy="15.5" r="1.2" stroke={color} strokeWidth="1.2" />
    <Circle cx="13" cy="15.5" r="1.2" stroke={color} strokeWidth="1.2" />
  </Svg>
);

export const ShoppingIcon = ({ size = 16, color = defaultStroke }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 7h12l-1 9H5L4 7z"
      stroke={color}
      strokeWidth={defaultStrokeWidth}
      strokeLinejoin="round"
    />
    <Path d="M7 7a3 3 0 016 0" stroke={color} strokeWidth={defaultStrokeWidth} />
  </Svg>
);

export const BillsIcon = ({ size = 16, color = defaultStroke }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 4h12v13l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L4 17V4z"
      stroke={color}
      strokeWidth={defaultStrokeWidth}
      strokeLinejoin="round"
    />
  </Svg>
);

export const OtherIcon = ({ size = 16, color = defaultStroke }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx="5" cy="10" r="1.3" stroke={color} strokeWidth={defaultStrokeWidth} />
    <Circle cx="10" cy="10" r="1.3" stroke={color} strokeWidth={defaultStrokeWidth} />
    <Circle cx="15" cy="10" r="1.3" stroke={color} strokeWidth={defaultStrokeWidth} />
  </Svg>
);

export const CategoryIcon = ({ category, size, color }) => {
  switch (category) {
    case 'food': return <FoodIcon size={size} color={color} />;
    case 'transport': return <TransportIcon size={size} color={color} />;
    case 'shopping': return <ShoppingIcon size={size} color={color} />;
    case 'bills': return <BillsIcon size={size} color={color} />;
    default: return <OtherIcon size={size} color={color} />;
  }
};

export const ArrowIcon = ({ size = 14, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path d="M6 6h8v8M6 14L14 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const ChevronRightIcon = ({ size = 14, color = '#6b6b6b' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M7 5l6 5-6 5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CloseIcon = ({ size = 14, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const PlusIcon = ({ size = 16, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const HomeIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StatsIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 19V11M12 19V5M19 19v-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const AddCircleIcon = ({ size = 22, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const HistoryClockIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
    <Path d="M12 7v5l3 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const ProfileIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="9" r="3.2" stroke={color} strokeWidth="1.8" />
    <Path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export const DollarIcon = ({ size = 16, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 3v14M13 6.5C13 5 11.7 4 10 4S7 5 7 6.5 8.3 9 10 9s3 1 3 2.5S11.7 13 10 13s-3-1-3-2.5"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TextLinesIcon = ({ size = 16, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 5h12M4 10h12M4 15h8"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ClockIcon = ({ size = 16, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.7" />
    <Path
      d="M10 6v4l3 2"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MailIcon = ({ size = 16, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Rect x="3" y="5" width="14" height="11" rx="2" stroke={color} strokeWidth="1.7" />
    <Path
      d="M3 6l7 5 7-5"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LockIcon = ({ size = 16, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Rect x="4" y="9" width="12" height="8" rx="2" stroke={color} strokeWidth="1.7" />
    <Path
      d="M7 9V6.5a3 3 0 016 0V9"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const WalletIcon = ({ size = 20, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="6" width="18" height="13" rx="3" stroke={color} strokeWidth="1.7" />
    <Path
      d="M3 9h13a2 2 0 012 2v3a2 2 0 01-2 2H3"
      stroke={color}
      strokeWidth="1.7"
    />
    <Circle cx="16.5" cy="12.5" r="1.1" fill={color} />
  </Svg>
);

export const NotebookIcon = ({ size = 20, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21V3z"
      stroke={color}
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <Path
      d="M9 8h6M9 12h6M9 16h4"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </Svg>
);

export const AvatarIcon = ({ size = 18, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="7.5" r="3" stroke={color} strokeWidth="1.6" />
    <Path
      d="M3.5 17c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </Svg>
);

export const BrandIcon = ({ size = 16, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Rect x="3" y="3" width="14" height="14" rx="4" stroke={color} strokeWidth="1.6" />
    <Path d="M7 8h6M7 12h6M10 6v8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);
