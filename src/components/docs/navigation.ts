export interface NavLink {
  label: string
  hash: string
}

export interface NavGroup {
  title: string
  links: NavLink[]
}

/** Component sections shown in the sidebar for the Components page. */
export const componentNav: NavGroup[] = [
  {
    title: 'Actions',
    links: [
      { label: 'Button', hash: '#button' },
      { label: 'Button playground', hash: '#playground' },
    ],
  },
  {
    title: 'Data display',
    links: [
      { label: 'Badge', hash: '#badge' },
      { label: 'Card', hash: '#card' },
      { label: 'Avatar', hash: '#avatar' },
    ],
  },
  {
    title: 'Forms',
    links: [
      { label: 'Input', hash: '#input' },
      { label: 'Toggle', hash: '#toggle' },
    ],
  },
  {
    title: 'Navigation',
    links: [{ label: 'Tabs', hash: '#tabs' }],
  },
  {
    title: 'Feedback',
    links: [
      { label: 'Alert', hash: '#alert' },
      { label: 'Tooltip', hash: '#tooltip' },
      { label: 'Modal', hash: '#modal' },
    ],
  },
]
