// src/theme/colors.js
export const palette = {
  // Primario: Verde bosque / Esmeralda universitario (identidad U-Found)
  primary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#059669', // Principal
    600: '#047857',
    700: '#065F46',
    800: '#064E3B',
    900: '#022C22',
  },
  // Secundario / Acento: Azul académico
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    500: '#2563EB',
    600: '#1D4ED8',
    700: '#1E40AF',
    900: '#1E293B',
  },
  // Neutros / Escala de grises
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  // Semánticos
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    700: '#B45309',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    500: '#A855F7',
    700: '#7E22CE',
  },
};

export const colors = {
  // Brand
  primary: palette.primary[500],
  primaryLight: palette.primary[100],
  primaryDark: palette.primary[700],
  primarySurface: palette.primary[50],

  secondary: palette.secondary[500],
  secondaryLight: palette.secondary[100],
  secondaryDark: palette.secondary[700],

  // Background & Surfaces
  background: palette.neutral[50],
  surface: palette.neutral[0],
  surfaceElevated: palette.neutral[0],
  surfaceSubtle: palette.neutral[100],
  surfaceHover: palette.neutral[200],

  // Text
  text: palette.neutral[900],
  textSecondary: palette.neutral[600],
  textMuted: palette.neutral[400],
  textInverted: palette.neutral[0],
  textPrimary: palette.primary[700],

  // Borders & Dividers
  border: palette.neutral[200],
  borderLight: palette.neutral[100],
  borderFocus: palette.primary[500],

  // Estados específicos U-Found
  statusLostBg: palette.red[50],
  statusLostText: palette.red[700],
  statusLostBorder: palette.red[100],

  statusFoundBg: palette.primary[50],
  statusFoundText: palette.primary[700],
  statusFoundBorder: palette.primary[100],

  statusReturnedBg: palette.secondary[50],
  statusReturnedText: palette.secondary[700],
  statusReturnedBorder: palette.secondary[100],

  // Alertas generales
  danger: palette.red[500],
  dangerLight: palette.red[100],
  warning: palette.amber[500],
  warningLight: palette.amber[100],
  success: palette.primary[500],
  successLight: palette.primary[100],

  white: palette.neutral[0],
  black: palette.neutral[900],
  transparent: 'transparent',
};
