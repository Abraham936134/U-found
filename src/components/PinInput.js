// src/components/PinInput.js
import React, { useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

/**
 * Componente PinInput (Categoría: Entrada)
 * Entrada controlada de código PIN (OTP) de 4 dígitos utilizada en la entrega segura antifraude de U-Found.
 */
export default function PinInput({
  value = '',
  onChangeText,
  length = 4,
  onComplete,
  error = false,
  style,
}) {
  const inputRef = useRef(null);

  const handleChange = (text) => {
    // Solo permitir números y limitar al largo indicado
    const sanitized = text.replace(/[^0-9]/g, '').slice(0, length);
    if (onChangeText) {
      onChangeText(sanitized);
    }
    if (sanitized.length === length && onComplete) {
      onComplete(sanitized);
    }
  };

  const handleCellPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const digits = value.split('');

  return (
    <View style={[styles.container, style]}>
      {/* Input oculto real para capturar el teclado */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        autoFocus={false}
      />

      {/* Cajas visuales de los dígitos */}
      <Pressable onPress={handleCellPress} style={styles.boxesContainer}>
        {Array.from({ length }).map((_, index) => {
          const char = digits[index] || '';
          const isFocused = value.length === index;

          return (
            <View
              key={index}
              style={[
                styles.cell,
                isFocused && styles.cellFocused,
                char ? styles.cellFilled : null,
                error && styles.cellError,
              ]}
            >
              <Text
                style={[
                  styles.cellText,
                  error && styles.cellTextError,
                  char ? styles.cellTextFilled : null,
                ]}
              >
                {char || '•'}
              </Text>
            </View>
          );
        })}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0.01,
    width: 1,
    height: 1,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  cell: {
    width: 54,
    height: 60,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySurface,
  },
  cellFilled: {
    borderColor: colors.primaryDark,
  },
  cellError: {
    borderColor: colors.danger,
    backgroundColor: colors.statusLostBg,
  },
  cellText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
  },
  cellTextFilled: {
    color: colors.text,
  },
  cellTextError: {
    color: colors.danger,
  },
});
