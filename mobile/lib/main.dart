import 'package:flutter/material.dart';

import 'app_theme.dart';
import 'widgets.dart';

void main() {
  runApp(const QuizzyApp());
}

class QuizzyApp extends StatelessWidget {
  const QuizzyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quizzy',
      debugShowCheckedModeBanner: false,
      theme: buildTheme(),
      initialRoute: '/',
      routes: {
        '/': (context) => const SignUpChoiceScreen(),
        '/shell': (context) => const AppShell(),
        '/create-account': (context) => const CreateAccountScreen(),
        '/practice-test': (context) => const GeneratePracticeTestScreen(),
        '/flashcard-set': (context) => const CreateFlashcardSetScreen(),
        '/study-guide': (context) => const GenerateStudyGuideScreen(),
        '/update-exams': (context) => const UpdateExamsScreen(),
        '/profile': (context) => const ProfileScreen(),
        '/settings': (context) => const SettingsScreen(),
        '/subscription': (context) => const SubscriptionScreen(),
        '/trial-features': (context) => const TrialFeaturesScreen(),
        '/deck': (context) => const FlashcardDeckScreen(),
        '/flashcard-player': (context) => const FlashcardPlayerScreen(),
      },
    );
  }
}

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;

  final _screens = const [
    HomeScreen(),
    CreateHubScreen(),
    LibraryScreen(),
    FreeTrialScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_index],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: (value) => setState(() => _index = value),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.add), label: 'Create'),
          BottomNavigationBarItem(icon: Icon(Icons.folder_outlined), label: 'Library'),
          BottomNavigationBarItem(icon: Icon(Icons.add_circle_outline), label: 'Free trial'),
        ],
      ),
    );
  }
}

class SignUpChoiceScreen extends StatelessWidget {
  const SignUpChoiceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const StatusRow(),
            const SizedBox(height: 20),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
                child: Column(
                  children: [
                    Container(
                      height: 220,
                      width: 220,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: LinearGradient(
                          colors: [Color(0xFFFAAD4C), Color(0xFF5A4FCF)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                      ),
                      child: const Icon(Icons.menu_book_rounded, size: 90, color: Colors.white),
                    ),
                    const SizedBox(height: 28),
                    const Text(
                      'The best way to study.\nSign up for free.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      "By signing up, you accept Quizzy's Terms of service and Privacy policy",
                      textAlign: TextAlign.center,
                      style: TextStyle(color: AppColors.textSecondary),
                    ),
                    const SizedBox(height: 28),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        minimumSize: const Size.fromHeight(56),
                        backgroundColor: const Color(0xFF4666FF),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(26)),
                      ),
                      onPressed: () => Navigator.pushNamed(context, '/shell'),
                      icon: const Icon(Icons.g_mobiledata, size: 28),
                      label: const Text('Continue with Google'),
                    ),
                    const SizedBox(height: 12),
                    OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size.fromHeight(56),
                        backgroundColor: Colors.white,
                        foregroundColor: Colors.black,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(26)),
                      ),
                      onPressed: () => Navigator.pushNamed(context, '/shell'),
                      icon: const Icon(Icons.apple, size: 22),
                      label: const Text('Continue with Apple'),
                    ),
                    const SizedBox(height: 12),
                    OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size.fromHeight(56),
                        backgroundColor: AppColors.surface,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(26)),
                      ),
                      onPressed: () => Navigator.pushNamed(context, '/create-account'),
                      icon: const Icon(Icons.mail_outline),
                      label: const Text('Sign up with email'),
                    ),
                    const SizedBox(height: 16),
                    GestureDetector(
                      onTap: () => Navigator.pushReplacementNamed(context, '/shell'),
                      child: const Text.rich(
                        TextSpan(
                          text: 'Have an account? ',
                          children: [
                            TextSpan(
                              text: 'Log in',
                              style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.primary),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    TextButton(
                      onPressed: () => Navigator.pushReplacementNamed(context, '/shell'),
                      child: const Text('Skip to preview'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CreateAccountScreen extends StatefulWidget {
  const CreateAccountScreen({super.key});

  @override
  State<CreateAccountScreen> createState() => _CreateAccountScreenState();
}

class _CreateAccountScreenState extends State<CreateAccountScreen> {
  DateTime? selectedDate;
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String? error;

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final buttonEnabled = selectedDate != null && emailController.text.isNotEmpty && passwordController.text.isNotEmpty;
    final dobText = selectedDate == null
        ? 'Date of birth'
        : '${selectedDate!.day} ${_monthName(selectedDate!.month)} ${selectedDate!.year}';

    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const StatusRow(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.arrow_back, color: Colors.white),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 22),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 12),
                  const Text('Create account', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 24),
                  GestureDetector(
                    onTap: _pickDate,
                    child: AbsorbPointer(
                      absorbing: true,
                      child: TextFormField(
                        decoration: InputDecoration(
                          labelText: 'Date of birth',
                          hintText: dobText,
                          suffixIcon: const Icon(Icons.info_outline, color: AppColors.textPrimary),
                        ),
                        controller: TextEditingController(text: selectedDate == null ? '' : dobText),
                      ),
                    ),
                  ),
                  if (error != null) ...[
                    const SizedBox(height: 8),
                    Text(
                      error!,
                      style: const TextStyle(color: AppColors.warning, fontWeight: FontWeight.w600),
                    ),
                  ],
                  const SizedBox(height: 16),
                  TextField(
                    controller: emailController,
                    decoration: const InputDecoration(labelText: 'Email'),
                    onChanged: (_) => setState(() {}),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      suffixIcon: IconButton(
                        icon: const Icon(Icons.visibility_off_outlined, color: AppColors.textPrimary),
                        onPressed: () {},
                      ),
                    ),
                    onChanged: (_) => setState(() {}),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    "By signing up, you accept Quizzy's Terms of service and Privacy policy",
                    style: TextStyle(color: AppColors.textSecondary),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: buttonEnabled ? _submit : null,
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(60),
                      backgroundColor: buttonEnabled ? AppColors.surfaceMuted : AppColors.surface,
                      foregroundColor: Colors.white.withValues(alpha: buttonEnabled ? 1 : 0.6),
                    ),
                    child: const Text('Create account'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _pickDate() async {
    final today = DateTime.now();
    final picked = await showDatePicker(
      context: context,
      initialDate: today,
      firstDate: DateTime(1950),
      lastDate: today,
      builder: (context, child) {
        return Theme(
          data: buildTheme(),
          child: child ?? const SizedBox(),
        );
      },
    );
    if (picked != null) {
      setState(() {
        selectedDate = picked;
        if (picked.year == today.year && picked.month == today.month && picked.day == today.day) {
          error = "That's today's date. Please select your date of birth.";
        } else {
          error = null;
        }
      });
    }
  }

  void _submit() {
    if (error != null) return;
    Navigator.pushReplacementNamed(context, '/shell');
  }

  String _monthName(int month) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return months[month - 1];
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Column(
              children: [
                const StatusRow(),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            hintText: 'Search',
                            prefixIcon: const Icon(Icons.search),
                            fillColor: AppColors.surface,
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      GestureDetector(
                        onTap: () => Navigator.pushNamed(context, '/profile'),
                        child: CircleAvatar(
                          radius: 20,
                          backgroundColor: const Color(0xFF6E55D8),
                          child: const Text('M', style: TextStyle(fontWeight: FontWeight.w800)),
                        ),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: FilledActionCard(
                    title: 'Find the latest content based on your exams',
                    subtitle: 'Update standardized exams',
                    cta: 'Update standardized exams',
                    onTap: () => Navigator.pushNamed(context, '/update-exams'),
                    icon: const Icon(Icons.search, color: Colors.white),
                  ),
                ),
                const SizedBox(height: 16),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: FilledActionCard(
                    title: 'Create your own flashcards',
                    subtitle: "Study exactly what's on your test",
                    cta: 'Create flashcards',
                    gradient: const LinearGradient(
                      colors: [Color(0xFF1D2C68), Color(0xFF253873)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    onTap: () => Navigator.pushNamed(context, '/flashcard-set'),
                    icon: const Icon(Icons.style_outlined, color: Colors.white),
                  ),
                ),
                const SizedBox(height: 12),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                  child: Row(
                    children: [
                      Text(
                        'Top picks',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                      ),
                      const Spacer(),
                      const Icon(Icons.more_horiz, color: AppColors.textPrimary),
                    ],
                  ),
                ),
                SizedBox(
                  height: 230,
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    scrollDirection: Axis.horizontal,
                    itemBuilder: (context, index) {
                      final item = _topPicks[index];
                      return Container(
                        width: 240,
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(22),
                          gradient: item.gradient,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: Colors.white.withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                  child: const Icon(Icons.folder_shared_outlined, color: Colors.white),
                                ),
                                const Spacer(),
                                const Icon(Icons.more_vert, color: Colors.white),
                              ],
                            ),
                            const Spacer(),
                            Text(
                              item.title,
                              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                            ),
                            const SizedBox(height: 8),
                            Text(item.subtitle, style: const TextStyle(color: AppColors.textSecondary)),
                            const SizedBox(height: 10),
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                  decoration: BoxDecoration(
                                    color: Colors.white.withValues(alpha: 0.12),
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                  child: Text(item.meta),
                                ),
                              ],
                            )
                          ],
                        ),
                      );
                    },
                    separatorBuilder: (_, __) => const SizedBox(width: 12),
                    itemCount: _topPicks.length,
                  ),
                ),
                const SizedBox(height: 20),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: RoundedTile(
                    title: 'Opt in to notifications',
                    subtitle: 'Stay on track with personalised study reminders.',
                    icon: const Icon(Icons.notifications_active_outlined, color: AppColors.accentSecondary),
                    trailing: Switch(
                      value: false,
                      onChanged: (_) => _showNotificationSheet(context),
                      activeColor: AppColors.primary,
                    ),
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showNotificationSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 48,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Opt in to notifications',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 10),
              const Text(
                'Stay on track with personalised study reminders.',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppColors.textSecondary),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('I\'m in'),
              ),
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Not now'),
              ),
            ],
          ),
        );
      },
    );
  }
}

class CreateHubScreen extends StatelessWidget {
  const CreateHubScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: ListView(
          children: [
            const StatusRow(
              trailing: Icon(Icons.settings_outlined, color: Colors.white),
            ),
            const SizedBox(height: 16),
            Center(
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.06),
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: const Icon(Icons.task_alt_rounded, color: Colors.orangeAccent, size: 38),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'Generate practice test',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Previous exams, study guides and structured notes in sciences or humanities work best',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: AppColors.textSecondary),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            RoundedTile(
              title: 'Select file',
              subtitle: '.pdf, .docx, .pptx',
              icon: const Icon(Icons.file_upload_outlined, color: AppColors.textPrimary),
              onTap: () => Navigator.pushNamed(context, '/practice-test'),
            ),
            const SizedBox(height: 12),
            RoundedTile(
              title: 'Paste text',
              icon: const Icon(Icons.text_fields_outlined, color: AppColors.textPrimary),
              onTap: () => Navigator.pushNamed(context, '/practice-test'),
            ),
            const SizedBox(height: 12),
            RoundedTile(
              title: 'Flashcard set',
              icon: const Icon(Icons.style_outlined, color: AppColors.textPrimary),
              onTap: () => Navigator.pushNamed(context, '/flashcard-set'),
            ),
            const SizedBox(height: 32),
            RoundedTile(
              title: 'Create flashcard set',
              subtitle: 'Scan docs, select images, paste text or upload files',
              icon: const Icon(Icons.collections_bookmark_outlined, color: AppColors.textPrimary),
              onTap: () => Navigator.pushNamed(context, '/flashcard-set'),
            ),
            const SizedBox(height: 14),
            RoundedTile(
              title: 'Generate study guide',
              subtitle: 'Upload notes, lecture slides, readings or other materials',
              icon: const Icon(Icons.library_books_outlined, color: AppColors.textPrimary),
              onTap: () => Navigator.pushNamed(context, '/study-guide'),
            ),
          ],
        ),
      ),
    );
  }
}

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({super.key});

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  int categoryIndex = 4;
  int filterIndex = 3;

  final categories = const ['Study sets', 'Study guides', 'Classes', 'Folders', 'Expert solutions'];
  final filters = const ['All', 'Textbooks', 'Exercises', 'Questions'];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const StatusRow(),
            const SizedBox(height: 12),
            Center(
              child: Text(
                'Your library',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
              ),
            ),
            const SizedBox(height: 18),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: List.generate(categories.length, (index) {
                  final selected = categoryIndex == index;
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 6),
                    child: ChoiceChip(
                      selected: selected,
                      label: Text(
                        categories[index],
                        style: TextStyle(
                          color: selected ? Colors.white : AppColors.textSecondary,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      selectedColor: Colors.white.withValues(alpha: 0.08),
                      onSelected: (_) => setState(() => categoryIndex = index),
                      backgroundColor: AppColors.backgroundAlt,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                        side: BorderSide(
                          color: selected ? AppColors.primary : AppColors.outline,
                          width: selected ? 1.4 : 1,
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
            const SizedBox(height: 12),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: List.generate(filters.length, (index) {
                  final selected = filterIndex == index;
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: Column(
                      children: [
                        GestureDetector(
                          onTap: () => setState(() => filterIndex = index),
                          child: Text(
                            filters[index],
                            style: TextStyle(
                              fontWeight: FontWeight.w700,
                              color: selected ? Colors.white : AppColors.textSecondary,
                            ),
                          ),
                        ),
                        const SizedBox(height: 6),
                        Container(
                          height: 3,
                          width: 70,
                          decoration: BoxDecoration(
                            color: selected ? AppColors.primary : AppColors.outline,
                            borderRadius: BorderRadius.circular(8),
                          ),
                        )
                      ],
                    ),
                  );
                }),
              ),
            ),
            const SizedBox(height: 40),
            Expanded(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    CircleAvatar(
                      backgroundColor: AppColors.surface,
                      radius: 48,
                      child: Icon(Icons.article_outlined, color: Colors.lightBlueAccent, size: 36),
                    ),
                    SizedBox(height: 16),
                    Text('You have not viewed any questions yet', style: TextStyle(fontSize: 16)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class FreeTrialScreen extends StatelessWidget {
  const FreeTrialScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const StatusRow(),
          const SizedBox(height: 10),
          Center(
            child: Pill(
              label: 'Free 7-day trial',
              color: Colors.white.withValues(alpha: 0.08),
              icon: const Icon(Icons.lock_open_rounded, color: Colors.white),
            ),
          ),
          const SizedBox(height: 20),
          const Text('Quizzy Plus', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
          const SizedBox(height: 12),
          const Text(
            'Get Quizzy Plus free for 7 days. Trial ends after 7 days unless you cancel.',
            style: TextStyle(color: AppColors.textSecondary),
          ),
          const SizedBox(height: 20),
          RoundedTile(
            title: 'Study Guides',
            subtitle: 'Generate dynamic study tools from your class materials.',
            icon: const Icon(Icons.description_outlined, color: Colors.pinkAccent),
          ),
          const SizedBox(height: 10),
          RoundedTile(
            title: 'Expert solutions',
            subtitle: 'Crush tough homework with expert-written solutions.',
            icon: const Icon(Icons.checklist_rounded, color: Colors.orangeAccent),
          ),
          const SizedBox(height: 10),
          RoundedTile(
            title: 'Customised sets',
            subtitle: 'Add images, audio, highlighting and more.',
            icon: const Icon(Icons.camera_alt_outlined, color: Colors.blueAccent),
          ),
          const SizedBox(height: 10),
          RoundedTile(
            title: 'Ad-free studying',
            subtitle: 'Stay focused with 100% ad-free studying.',
            icon: const Icon(Icons.block, color: Colors.greenAccent),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () => Navigator.pushNamed(context, '/subscription'),
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.accent),
            child: const Text('View subscriptions', style: TextStyle(color: Colors.black)),
          ),
          const SizedBox(height: 12),
          OutlinedButton(
            onPressed: () => Navigator.pushNamed(context, '/trial-features'),
            child: const Text('Continue using the free version'),
          ),
        ],
      ),
    );
  }
}

class GeneratePracticeTestScreen extends StatelessWidget {
  const GeneratePracticeTestScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const InputActionScreen(
      title: 'Generate practice test',
      description: 'Previous exams, study guides and structured notes in sciences or humanities work best',
      icon: Icons.task_alt_rounded,
    );
  }
}

class CreateFlashcardSetScreen extends StatelessWidget {
  const CreateFlashcardSetScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const InputActionScreen(
      title: 'Create flashcard set',
      description: 'Scan docs, select images, paste text or upload files',
      icon: Icons.style_outlined,
      extras: [
        InputAction(title: 'Scan document', subtitle: '5 max.', icon: Icons.document_scanner_outlined),
        InputAction(title: 'Select images', icon: Icons.photo_outlined),
        InputAction(title: 'Paste text', icon: Icons.text_fields_outlined),
        InputAction(title: 'Select file', subtitle: '.pdf, .docx, .pptx', icon: Icons.file_upload_outlined),
        InputAction(title: 'Create manually', icon: Icons.keyboard_outlined),
      ],
    );
  }
}

class GenerateStudyGuideScreen extends StatelessWidget {
  const GenerateStudyGuideScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const InputActionScreen(
      title: 'Generate study guide',
      description: 'Upload notes, lecture slides, readings or other subject materials',
      icon: Icons.auto_stories_outlined,
    );
  }
}

class InputActionScreen extends StatelessWidget {
  const InputActionScreen({
    super.key,
    required this.title,
    required this.description,
    required this.icon,
    this.extras,
  });

  final String title;
  final String description;
  final IconData icon;
  final List<InputAction>? extras;

  @override
  Widget build(BuildContext context) {
    final actions = extras ??
        const [
          InputAction(title: 'Select file', subtitle: '.pdf, .docx, .pptx', icon: Icons.file_upload_outlined),
          InputAction(title: 'Paste text', icon: Icons.text_fields_outlined),
          InputAction(title: 'Flashcard set', icon: Icons.style_outlined),
        ];

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          child: Column(
            children: [
              const StatusRow(),
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.close, color: Colors.white),
                  ),
                  const Spacer(),
                  const Icon(Icons.info_outline, color: Colors.white),
                  const SizedBox(width: 12),
                  const Icon(Icons.settings_outlined, color: Colors.white),
                ],
              ),
              const SizedBox(height: 12),
              const SizedBox(height: 10),
              Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.06),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Icon(icon, color: Colors.orangeAccent, size: 36),
                  ),
                  const SizedBox(height: 12),
                  Text(title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 8),
                  Text(
                    description,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: AppColors.textSecondary),
                  ),
                ],
              ),
              const SizedBox(height: 18),
              Expanded(
                child: ListView.separated(
                  itemBuilder: (context, index) {
                    final action = actions[index];
                    return RoundedTile(
                      title: action.title,
                      subtitle: action.subtitle,
                      icon: Icon(action.icon, color: AppColors.textPrimary),
                    );
                  },
                  separatorBuilder: (_, __) => const SizedBox(height: 10),
                  itemCount: actions.length,
                ),
              ),
              const SizedBox(height: 18),
              const Text(
                'This product is enhanced with AI and may provide incorrect or problematic content. Do not enter any personal data.',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppColors.textSecondary, fontSize: 12),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}

class InputAction {
  final String title;
  final String? subtitle;
  final IconData icon;

  const InputAction({required this.title, this.subtitle, required this.icon});
}

class UpdateExamsScreen extends StatelessWidget {
  const UpdateExamsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const StatusRow(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.close, color: Colors.white),
                  ),
                  const Spacer(),
                  const Text('Update exams', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
                  const Spacer(),
                  const SizedBox(width: 48),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'Enter your exams',
                  prefixIcon: const Icon(Icons.search),
                  fillColor: AppColors.surface,
                ),
              ),
            ),
            Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Popular exams',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                itemBuilder: (context, index) {
                  final exam = _exams[index];
                  return RoundedTile(
                    title: exam.title,
                    subtitle: exam.subtitle,
                    trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: AppColors.textSecondary),
                  );
                },
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemCount: _exams.length,
              ),
            )
          ],
        ),
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            const StatusRow(),
            Row(
              children: [
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                ),
                const Spacer(),
                Pill(
                  label: 'Free trial',
                  color: AppColors.accent,
                  onTap: () => Navigator.pushNamed(context, '/subscription'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Center(
              child: Column(
                children: const [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: Color(0xFF6E55D8),
                    child: Text('M', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w800)),
                  ),
                  SizedBox(height: 10),
                  Text('Mobeen_Hafeez6', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
                ],
              ),
            ),
            const SizedBox(height: 18),
            RoundedTile(
              title: 'Settings',
              icon: const Icon(Icons.settings_outlined, color: AppColors.textPrimary),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
              onTap: () => Navigator.pushNamed(context, '/settings'),
            ),
            const SizedBox(height: 10),
            RoundedTile(
              title: 'Activity',
              icon: const Icon(Icons.notifications_none_rounded, color: AppColors.textPrimary),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 24),
            SectionHeader(
              title: 'Achievements',
              action: TextButton(
                onPressed: () {},
                child: const Text('View all'),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 4),
            ),
            Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(22),
                border: Border.all(color: AppColors.outline),
              ),
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Text('1-week streak', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
                      Spacer(),
                      Icon(Icons.more_horiz, color: AppColors.textSecondary),
                    ],
                  ),
                  const SizedBox(height: 14),
                  const Center(
                    child: Icon(Icons.local_fire_department, size: 64, color: Colors.orangeAccent),
                  ),
                  const SizedBox(height: 14),
                  const Text(
                    'Study next week to keep your streak going!',
                    style: TextStyle(color: AppColors.textSecondary),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text('S'),
                      Text('M'),
                      Text('T'),
                      Text('W'),
                      Text('T'),
                      Text('F'),
                      Text('S'),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceMuted,
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: Row(
                      children: List.generate(7, (index) {
                        final day = 7 + index;
                        final selected = index == 1;
                        return Expanded(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 4),
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              decoration: BoxDecoration(
                                color: selected ? Colors.orangeAccent : Colors.transparent,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Column(
                                children: [
                                  Text('$day', textAlign: TextAlign.center),
                                  if (selected)
                                    const Icon(Icons.local_fire_department, size: 16, color: Colors.white),
                                ],
                              ),
                            ),
                          ),
                        );
                      }),
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            const StatusRow(),
            Row(
              children: [
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                ),
                const SizedBox(width: 8),
                const Text('Settings', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
              ],
            ),
            const SizedBox(height: 20),
            const RoundedTile(
              title: 'Sound effects',
              trailing: Switch(value: true, onChanged: null),
            ),
            const SizedBox(height: 12),
            const RoundedTile(
              title: 'Haptic feedback',
              trailing: Switch(value: true, onChanged: null),
            ),
            const SizedBox(height: 12),
            RoundedTile(
              title: 'Your privacy and cookie choices',
              icon: const Icon(Icons.privacy_tip_outlined, color: AppColors.textPrimary),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 24),
            const Text('About', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 12),
            ...[
              'Privacy policy',
              'California privacy',
              'Terms of service',
              'Open source licenses',
              'Help Centre',
            ].map(
              (text) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: RoundedTile(
                  title: text,
                  trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
                ),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.surfaceMuted),
              child: const Text('Log out'),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.warning),
              child: const Text('Delete account'),
            ),
            const SizedBox(height: 20),
            Center(
              child: Column(
                children: const [
                  Icon(Icons.circle_outlined, color: Colors.white70, size: 32),
                  SizedBox(height: 6),
                  Text('v1.0.0', style: TextStyle(color: AppColors.textSecondary)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class FlashcardDeckScreen extends StatelessWidget {
  const FlashcardDeckScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            const StatusRow(),
            Row(
              children: [
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                ),
                const Spacer(),
                Pill(
                  label: 'Free trial',
                  color: AppColors.accent,
                  onTap: () => Navigator.pushNamed(context, '/subscription'),
                ),
                const SizedBox(width: 12),
                const Icon(Icons.bookmark_border, color: Colors.white),
                const SizedBox(width: 12),
                const Icon(Icons.more_horiz, color: Colors.white),
              ],
            ),
            const SizedBox(height: 18),
            Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(22),
              ),
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceMuted,
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: const Text(
                      'What are the three types of intermolecular forces?',
                      style: TextStyle(fontSize: 22),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text('AQA A-Level Chemistry 3.1.3.7: \nForces Between Molecules',
                      style: TextStyle(fontWeight: FontWeight.w800), textAlign: TextAlign.center),
                  const SizedBox(height: 8),
                  const Text('Bookloverlolly • 33 terms', style: TextStyle(color: AppColors.textSecondary)),
                ],
              ),
            ),
            const SizedBox(height: 16),
            RoundedTile(
              title: 'Flashcards',
              icon: const Icon(Icons.collections_bookmark_outlined, color: Colors.lightBlueAccent),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
              onTap: () => Navigator.pushNamed(context, '/flashcard-player'),
            ),
            const SizedBox(height: 10),
            RoundedTile(
              title: 'Learn',
              icon: const Icon(Icons.blur_circular, color: Colors.blueAccent),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 10),
            RoundedTile(
              title: 'Test',
              icon: const Icon(Icons.article_outlined, color: Colors.lightBlue),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 10),
            RoundedTile(
              title: 'Match',
              icon: const Icon(Icons.view_in_ar_outlined, color: Colors.blueAccent),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 10),
            RoundedTile(
              title: 'Blast',
              icon: const Icon(Icons.rocket_launch_outlined, color: Colors.lightBlue),
              trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 14),
            Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(18),
              ),
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Text('Your Progress', style: TextStyle(fontWeight: FontWeight.w800)),
                      Spacer(),
                      Icon(Icons.close, color: AppColors.textSecondary),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'With Progress, you can start studying the remaining terms you need to master in one tap.',
                    style: TextStyle(color: AppColors.textSecondary),
                  ),
                  const SizedBox(height: 12),
                  Column(
                    children: const [
                      _ProgressRow(label: 'Not studied'),
                      SizedBox(height: 8),
                      _ProgressRow(label: 'Still learning'),
                      SizedBox(height: 8),
                      _ProgressRow(label: 'Mastered'),
                    ],
                  ),
                  const SizedBox(height: 12),
                  TextButton(
                    onPressed: () => Navigator.pushNamed(context, '/subscription'),
                    child: const Text('Unlock Progress'),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

class _ProgressRow extends StatelessWidget {
  const _ProgressRow({required this.label});
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 24,
          height: 24,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.08),
            shape: BoxShape.circle,
          ),
          child: const Icon(Icons.lock, size: 14),
        ),
        const SizedBox(width: 12),
        Expanded(child: Text(label)),
        const Icon(Icons.chevron_right, color: AppColors.textSecondary),
      ],
    );
  }
}

class FlashcardPlayerScreen extends StatefulWidget {
  const FlashcardPlayerScreen({super.key});

  @override
  State<FlashcardPlayerScreen> createState() => _FlashcardPlayerScreenState();
}

class _FlashcardPlayerScreenState extends State<FlashcardPlayerScreen> {
  bool flipped = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const StatusRow(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.close, color: Colors.white),
                  ),
                  const Spacer(),
                  const Text('1 / 33', style: TextStyle(fontWeight: FontWeight.w800)),
                  const Spacer(),
                  IconButton(
                    onPressed: () => _openOptions(context),
                    icon: const Icon(Icons.settings_outlined, color: Colors.white),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(28),
                ),
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.volume_up_outlined, color: Colors.white),
                        Spacer(),
                        Icon(Icons.star_border, color: Colors.white),
                      ],
                    ),
                    const SizedBox(height: 40),
                    GestureDetector(
                      onTap: () => setState(() => flipped = !flipped),
                      child: Container(
                        width: double.infinity,
                        height: 320,
                        decoration: BoxDecoration(
                          color: AppColors.surfaceMuted,
                          borderRadius: BorderRadius.circular(22),
                        ),
                        padding: const EdgeInsets.all(18),
                        child: Center(
                          child: Text(
                            flipped ? 'Forces that act between molecules' : 'What are intermolecular forces?',
                            style: const TextStyle(fontSize: 24),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        const Text('Tap the card to flip it'),
                        const Spacer(),
                        IconButton(
                          onPressed: () => setState(() => flipped = !flipped),
                          icon: const Icon(Icons.play_arrow, color: Colors.white),
                        )
                      ],
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(backgroundColor: AppColors.surfaceMuted),
                      child: const Text('Restart Flashcards'),
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  void _openOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
      ),
      builder: (_) => const OptionsSheet(),
    );
  }
}

class OptionsSheet extends StatelessWidget {
  const OptionsSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 52,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.white24,
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close, color: Colors.white),
              ),
              const Spacer(),
              const Text('Options', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
              const Spacer(),
              const SizedBox(width: 40),
            ],
          ),
          const SizedBox(height: 16),
          _optionSwitch('Shuffle cards'),
          const SizedBox(height: 12),
          _optionSwitch('Text to speech'),
          const SizedBox(height: 16),
          Container(
            decoration: BoxDecoration(
              color: AppColors.surfaceMuted,
              borderRadius: BorderRadius.circular(18),
            ),
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Sort into piles', style: TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                  const Text(
                    'Sort your flashcards to keep track of what you know and what you are still learning.',
                    style: TextStyle(color: AppColors.textSecondary),
                  ),
                const SizedBox(height: 12),
                Switch(
                  value: true,
                  onChanged: (_) {},
                  activeColor: AppColors.primary,
                )
              ],
            ),
          ),
          const SizedBox(height: 16),
          Container(
            decoration: BoxDecoration(
              color: AppColors.surfaceMuted,
              borderRadius: BorderRadius.circular(18),
            ),
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Card orientation', style: TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 12),
                Container(
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Container(
                          decoration: BoxDecoration(
                            color: AppColors.textSecondary.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          alignment: Alignment.center,
                          child: const Text('Term'),
                        ),
                      ),
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          alignment: Alignment.center,
                          child: const Text('Definition'),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(foregroundColor: Colors.redAccent),
            child: const Text('Restart Flashcards'),
          ),
        ],
      ),
    );
  }

  Widget _optionSwitch(String label) {
    return Row(
      children: [
        Expanded(child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700))),
        Switch(
          value: false,
          onChanged: (_) {},
          activeColor: AppColors.primary,
        )
      ],
    );
  }
}

class SubscriptionScreen extends StatelessWidget {
  const SubscriptionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const StatusRow(),
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.close, color: Colors.white),
                  ),
                  const Spacer(),
                  Container(
                    width: 52,
                    height: 6,
                    decoration: BoxDecoration(
                      color: Colors.white24,
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  const Spacer(),
                  const SizedBox(width: 40),
                ],
              ),
              const SizedBox(height: 12),
              const Text('Choose your plan', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
              const SizedBox(height: 14),
              RoundedTile(
                title: 'Annual + 7-day free trial',
                subtitle: '£44.99 / year',
                icon: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.amber,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text('Best value', style: TextStyle(color: Colors.black)),
                ),
                trailing: const Icon(Icons.check_circle, color: Colors.greenAccent),
              ),
              const SizedBox(height: 10),
              const RoundedTile(
                title: 'Monthly',
                subtitle: '£9.99 / month',
                trailing: Icon(Icons.circle_outlined, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 20),
              const Text(
                'How an annual subscription with free trial works',
                style: TextStyle(fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 10),
              _timelineRow('Today: get instant access', 'Get Quizzy Plus free for 7 days with the annual subscription'),
              const SizedBox(height: 10),
              _timelineRow('12 December 2025: trial reminder', 'We will send you an email. Cancel anytime.'),
              const SizedBox(height: 10),
              _timelineRow('15 December 2025: trial ends', 'Trial ends. You will be billed for one year unless you cancel before this date.'),
              const Spacer(),
              ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/trial-features'),
                style: ElevatedButton.styleFrom(backgroundColor: AppColors.accent),
                child: const Text('Try free and subscribe', style: TextStyle(color: Colors.black)),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }

  Widget _timelineRow(String title, String subtitle) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: AppColors.primary,
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
              const SizedBox(height: 4),
              Text(subtitle, style: const TextStyle(color: AppColors.textSecondary)),
            ],
          ),
        )
      ],
    );
  }
}

class TrialFeaturesScreen extends StatelessWidget {
  const TrialFeaturesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final items = [
      ('Study Guides', 'Generate dynamic study tools from your class materials.', Icons.description_outlined),
      ('EXPERT SOLUTIONS', 'Crush tough homework with expert-written solutions.', Icons.edit_note_outlined),
      ('Study smarter with Learn and Test modes', 'Create custom quizzes and tests for faster learning.', Icons.fact_check_outlined),
      ('Customised sets', 'Customise flashcards with images, audio, highlighting and more.', Icons.camera_alt_outlined),
      ('Ad-free studying', 'Stay focussed with 100% ad-free studying.', Icons.block),
    ];

    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            const StatusRow(),
            Row(
              children: [
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close, color: Colors.white),
                ),
                const Spacer(),
              ],
            ),
            const SizedBox(height: 12),
            const Text('Free 7-day trial', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 6),
            const Text('Today', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
            const Text('Get Quizzy Plus free for 7 days.', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 12),
            const Text('15 December 2025', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
            const Text(
              'Trial ends. You will billed for one year unless you cancel before this date.',
              style: TextStyle(color: AppColors.textSecondary),
            ),
            const SizedBox(height: 16),
            ...items.map(
              (item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: RoundedTile(
                  title: item.$1,
                  subtitle: item.$2,
                  icon: Icon(item.$3, color: Colors.orangeAccent),
                ),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.popUntil(context, ModalRoute.withName('/shell')),
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.accent),
              child: const Text('View subscriptions', style: TextStyle(color: Colors.black)),
            ),
            const SizedBox(height: 12),
            OutlinedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Continue using the free version'),
            ),
          ],
        ),
      ),
    );
  }
}

// Data helpers
class TopPick {
  final String title;
  final String subtitle;
  final String meta;
  final Gradient gradient;

  TopPick(this.title, this.subtitle, this.meta, this.gradient);
}

final _topPicks = [
  TopPick(
    'Exam Prep for IELTS® Academic',
    '665 studiers today',
    '51 cards · by Quizzy',
    const LinearGradient(
      colors: [Color(0xFF1C234F), Color(0xFF1A3A6D)],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    ),
  ),
  TopPick(
    'General trivia',
    '5 practice questions',
    'Quick test',
    const LinearGradient(
      colors: [Color(0xFF1C2358), Color(0xFF262B5F)],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    ),
  ),
];

final _exams = [
  Exam('IELTS Academic', 'Exam Prep for IELTS® Academic'),
  Exam('SAT', 'Scholastic Assessment Test'),
  Exam('JEE Main', 'Joint Entrance Examination - Main'),
  Exam('ENEM', 'Exame Nacional do Ensino Médio'),
  Exam('NEET UG', 'National Eligibility cum Entrance Test Undergraduate'),
  Exam('GCSE English Lang', 'GCSE English Language 8700'),
  Exam('California DMV Knowledge Test', 'Exam Prep for CA DMV'),
];

class Exam {
  final String title;
  final String subtitle;
  Exam(this.title, this.subtitle);
}
