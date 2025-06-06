import { Key, KeyRound, KeySquare, Settings, UserCircle, CreditCard, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isDev } from '@/lib/environment'

interface SettingsNavigationProps {
  activeSection: string
  onSectionChange: (
    section: 'general' | 'environment' | 'account' | 'credentials' | 'apikeys' | 'subscription' | 'team'
  ) => void
  isTeam?: boolean
}

type NavigationItem = {
  id: 'general' | 'environment' | 'account' | 'credentials' | 'apikeys' | 'subscription' | 'team'
  label: string
  icon: React.ComponentType<{ className?: string }>
  hideInDev?: boolean
  requiresTeam?: boolean
}

const allNavigationItems: NavigationItem[] = [
  {
    id: 'general',
    label: 'General',
    icon: Settings,
  },
  {
    id: 'environment',
    label: 'Environment',
    icon: KeyRound,
  },
  {
    id: 'account',
    label: 'Account',
    icon: UserCircle,
  },
  {
    id: 'credentials',
    label: 'Credentials',
    icon: Key,
  },
  {
    id: 'apikeys',
    label: 'API Keys',
    icon: KeySquare,
  },
  {
    id: 'subscription',
    label: 'Subscription',
    icon: CreditCard,
    hideInDev: true,
  },
  {
    id: 'team',
    label: 'Team',
    icon: Users,
    hideInDev: true,
    requiresTeam: true,
  },
]

export function SettingsNavigation({ activeSection, onSectionChange, isTeam = false }: SettingsNavigationProps) {
  const navigationItems = allNavigationItems.filter(item => {
    // Hide items based on development environment
    if (item.hideInDev && isDev) {
      return false
    }
    
    // Hide team tab if user doesn't have team subscription
    if (item.requiresTeam && !isTeam) {
      return false
    }
    
    return true
  })

  return (
    <div className="py-4">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
            'hover:bg-muted/50',
            activeSection === item.id
              ? 'bg-muted/50 text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
