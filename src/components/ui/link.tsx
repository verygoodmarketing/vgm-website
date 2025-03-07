import React from 'react';
import { Button, buttonVariants } from './button';
import type { VariantProps } from 'class-variance-authority';

interface LinkProps
  extends Omit<React.ComponentPropsWithoutRef<'a'>, 'as' | 'color'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, variant, size, ...props }, ref) => {
    return (
      <Button asChild variant={variant} size={size}>
        <a href={href} ref={ref} {...props}>
          {children}
        </a>
      </Button>
    );
  }
);

Link.displayName = 'Link';

export { Link, buttonVariants };
