import 'package:flutter/material.dart';

class AppColors {
  static const background = Color(0xFF0D0F33);
  static const backgroundAlt = Color(0xFF10133B);
  static const surface = Color(0xFF2F3450);
  static const surfaceMuted = Color(0xFF3A3F5E);
  static const primary = Color(0xFF6D7BFF);
  static const accent = Color(0xFFEED265);
  static const accentSecondary = Color(0xFFFFC93A);
  static const success = Color(0xFF53C2C2);
  static const warning = Color(0xFFEB5757);
  static const textPrimary = Color(0xFFF4F5FF);
  static const textSecondary = Color(0xFFB8BED6);
  static const outline = Color(0xFF444967);
}

ThemeData buildTheme() {
  const borderRadius = 18.0;
  final base = ThemeData.dark();

  return base.copyWith(
    scaffoldBackgroundColor: AppColors.background,
    colorScheme: base.colorScheme.copyWith(
      primary: AppColors.primary,
      secondary: AppColors.accent,
      surface: AppColors.surface,
      onSurface: AppColors.textPrimary,
    ),
    textTheme: base.textTheme.apply(
      displayColor: AppColors.textPrimary,
      bodyColor: AppColors.textPrimary,
      fontFamily: 'SF Pro Display',
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
      foregroundColor: AppColors.textPrimary,
      centerTitle: true,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.surface,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(borderRadius),
        borderSide: const BorderSide(color: AppColors.outline, width: 1.2),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(borderRadius),
        borderSide: const BorderSide(color: AppColors.outline, width: 1.2),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(borderRadius),
        borderSide: const BorderSide(color: AppColors.primary, width: 1.6),
      ),
      hintStyle: const TextStyle(color: AppColors.textSecondary),
      labelStyle: const TextStyle(color: AppColors.textSecondary),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size.fromHeight(54),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(22),
        ),
        textStyle: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w700,
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.textPrimary,
        side: const BorderSide(color: AppColors.outline, width: 1.3),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(22),
        ),
      ),
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: AppColors.backgroundAlt,
      selectedItemColor: AppColors.textPrimary,
      unselectedItemColor: AppColors.textSecondary,
      type: BottomNavigationBarType.fixed,
      selectedLabelStyle: TextStyle(fontWeight: FontWeight.w700),
    ),
    cardTheme: CardThemeData(
      color: AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(22),
      ),
      elevation: 0,
      margin: EdgeInsets.zero,
    ),
    dividerColor: AppColors.outline,
  );
}
