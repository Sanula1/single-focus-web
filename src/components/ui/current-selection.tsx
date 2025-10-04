import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, BookOpen, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffectiveRole } from '@/hooks/useEffectiveRole';

interface CurrentSelectionProps {
  institute?: {
    id: string;
    name: string;
  };
  class?: {
    id: string;
    name: string;
  };
  subject?: {
    id: string;
    name: string;
  };
}

const CurrentSelection: React.FC<CurrentSelectionProps> = ({
  institute,
  class: selectedClass,
  subject
}) => {
  const { user } = useAuth();
  const effectiveRole = useEffectiveRole();

  if (!institute && !selectedClass && !subject) {
    return null;
  }

  return (
    <Card className="bg-secondary/30 border border-secondary/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Building className="h-4 w-4 text-primary" />
          Current Selection
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {institute && (
            <>
              <Badge variant="secondary">
                <Building className="h-3 w-3 mr-1" />
                {institute.name}
              </Badge>
              {selectedClass && <ChevronRight className="h-4 w-4 text-primary" />}
            </>
          )}
          {selectedClass && (
            <>
              <Badge variant="secondary">
                <Users className="h-3 w-3 mr-1" />
                {selectedClass.name}
              </Badge>
              {subject && <ChevronRight className="h-4 w-4 text-primary" />}
            </>
          )}
          {subject && (
            <Badge variant="secondary">
              <BookOpen className="h-3 w-3 mr-1" />
              {subject.name}
            </Badge>
          )}
        </div>

        {institute && (
          <div className="mt-3 text-sm text-muted-foreground">
            Institute: <span className="font-medium text-foreground">{institute.name}</span>
          </div>
        )}

        {(user?.name || effectiveRole) && (
          <div className="mt-2 text-sm text-muted-foreground space-y-1">
            {user?.name && (
              <div>
                Logged in as: <span className="font-medium text-foreground">{user.name}</span>
              </div>
            )}
            {effectiveRole && (
              <div>
                Role: <span className="font-medium text-primary">{effectiveRole}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentSelection;
