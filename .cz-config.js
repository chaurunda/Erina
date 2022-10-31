module.exports = {
  // IMPORTANT for the changelog generation: value must only contain
  // alphanumeric characters
  types: [
    {
      value: 'feat',
      name: 'feat: A new feature',
    },
    {
      value: 'fix',
      name: 'fix: A bug fix',
    },
    {
      value: 'test',
      name: 'test: Adding missing tests',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'hotfix',
      name: 'hotfix: urgent fix for production bug',
    },
    {
      value: 'docs',
      name: 'docs: Documentation only changes',
    },
    {
      value: 'chore',
      name:
        'chore: Changes to the build process or auxiliary tools\n' +
        '         and libraries such as documentation generation',
    },
    {
      value: 'revert',
      name: 'revert: Revert to a commit',
    },
  ],

  skipQuestions: ['body', 'footer'],
  appendBranchNameToCommitMessage: true,
  disableEmoji: true,
}
