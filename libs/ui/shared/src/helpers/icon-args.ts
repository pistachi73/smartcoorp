import {
  IoAccessibility,
  IoAccessibilityOutline,
  IoAccessibilitySharp,
  IoAdd,
  IoAddCircle,
  IoAddCircleOutline,
  IoAddCircleSharp,
  IoAddOutline,
  IoAddSharp,
  IoAlarmSharp,
  IoAlertCircle,
  IoBarChartSharp,
} from 'react-icons/io5';

const icons = {
  null: null,
  IoBarChartSharp,
  IoAccessibilitySharp,
  IoAccessibility,
  IoAccessibilityOutline,
  IoAdd,
  IoAddCircle,
  IoAddCircleOutline,
  IoAddCircleSharp,
  IoAddOutline,
  IoAddSharp,
  IoAlarmSharp,
  IoAlertCircle,
};

export const iconArgs = {
  options: Object.keys(icons), // An array of serializable values
  mapping: icons, // Maps serializable option values to complex arg values
  control: {
    type: 'select', // Type 'select' is automatically inferred when 'options' is defined
    labels: {
      // 'labels' maps option values to string labels
      IoBarChartSharp: 'IoBarChartSharp',
      IoAccessibilitySharp: 'IoAccessibilitySharp',
    },
  },
};
