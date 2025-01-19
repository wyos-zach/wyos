export type Pattern = 'dots' | 'lines' | 'squares' | null;

export interface PageHeaderProps {
  /**
   * The main title of the page
   */
  title: string;

  /**
   * Optional description text displayed below the title
   */
  description?: string;

  /**
   * Optional background pattern style
   * @default 'dots'
   */
  pattern?: Pattern;

  /**
   * Optional additional CSS classes
   */
  className?: string;

  /**
   * Optional alignment for the content
   * @default 'center'
   */
  align?: 'left' | 'center';

  /**
   * Optional size variant for the title
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large';
}
