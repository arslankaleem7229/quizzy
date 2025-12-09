import 'package:flutter/material.dart';
import 'app_theme.dart';

class StatusRow extends StatelessWidget {
  const StatusRow({super.key, this.trailing});
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      child: Row(
        children: [
          const Text(
            '9:32',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          const Spacer(),
          Row(
            children: const [
              Icon(Icons.location_on_outlined, size: 16, color: AppColors.textPrimary),
              SizedBox(width: 6),
              Icon(Icons.network_cell, size: 16, color: AppColors.textPrimary),
              SizedBox(width: 6),
              Icon(Icons.wifi, size: 16, color: AppColors.textPrimary),
              SizedBox(width: 6),
              Icon(Icons.battery_full, size: 16, color: AppColors.textPrimary),
            ],
          ),
          if (trailing != null) ...[
            const SizedBox(width: 8),
            trailing!,
          ],
        ],
      ),
    );
  }
}

class SectionHeader extends StatelessWidget {
  const SectionHeader({super.key, required this.title, this.action, this.padding});

  final String title;
  final Widget? action;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding ?? const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Row(
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
          ),
          const Spacer(),
          if (action != null) action!,
        ],
      ),
    );
  }
}

class RoundedTile extends StatelessWidget {
  const RoundedTile({
    super.key,
    required this.title,
    this.subtitle,
    this.icon,
    this.trailing,
    this.onTap,
    this.background,
    this.padding = const EdgeInsets.all(16),
  });

  final String title;
  final String? subtitle;
  final Widget? icon;
  final Widget? trailing;
  final VoidCallback? onTap;
  final Color? background;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: onTap,
      child: Ink(
        decoration: BoxDecoration(
          color: background ?? AppColors.surface,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.outline),
        ),
        padding: padding,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if (icon != null) ...[
              icon!,
              const SizedBox(width: 12),
            ],
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  if (subtitle != null) ...[
                    const SizedBox(height: 4),
                    Text(
                      subtitle!,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
                    ),
                  ],
                ],
              ),
            ),
            if (trailing != null) ...[
              const SizedBox(width: 12),
              trailing!,
            ],
          ],
        ),
      ),
    );
  }
}

class Pill extends StatelessWidget {
  const Pill({super.key, required this.label, this.color, this.onTap, this.icon});

  final String label;
  final Color? color;
  final VoidCallback? onTap;
  final Widget? icon;

  @override
  Widget build(BuildContext context) {
    final content = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (icon != null) ...[
          icon!,
          const SizedBox(width: 8),
        ],
        Text(
          label,
          style: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ],
    );

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: color ?? AppColors.surface,
          borderRadius: BorderRadius.circular(22),
        ),
        child: content,
      ),
    );
  }
}

class FilledActionCard extends StatelessWidget {
  const FilledActionCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.cta,
    this.icon,
    this.onTap,
    this.gradient,
  });

  final String title;
  final String subtitle;
  final String cta;
  final Widget? icon;
  final VoidCallback? onTap;
  final Gradient? gradient;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(22),
      child: Ink(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(22),
          gradient: gradient ??
              const LinearGradient(
                colors: [Color(0xFF1B2360), Color(0xFF101533)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
        ),
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (icon != null) ...[
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: icon,
              ),
              const SizedBox(height: 12),
            ],
            Text(
              title,
              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 6),
            Text(
              subtitle,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
            ),
            const SizedBox(height: 14),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Text(
                cta,
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
