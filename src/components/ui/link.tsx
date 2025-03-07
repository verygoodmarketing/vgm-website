import React from 'react';
import { Button } from './button';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: '',
      destructive: '',
      outline: '',
      secondary: '',
      ghost: '',
      link: '',
      amber: '',
      blue: '',
      outlineDark: '',
      white: '',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface LinkProps
  extends Omit<React.ComponentPropsWithoutRef<'a'>, 'as' | 'color'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
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

export { Link };
