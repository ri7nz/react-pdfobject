import * as React from 'react';
import * as pdfobject from 'pdfobject';

export type PageMode = 'bookmarks' | 'thumbs' | 'none';

export type ViewMode =
  | 'Fit'
  | 'FitH'
  | 'FitH,top'
  | 'FitV'
  | 'FitV,left'
  | 'FitB'
  | 'FitBH'
  | 'FitBH,top'
  | 'FitBV'
  | 'FitBV,left';

export type ZoomMode = 'scale' | 'scale,left,top';

// https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf
export interface OpenParams {
  page?: number;
  zoom?: ZoomMode;
  nameddest?: string;
  pagemode?: PageMode;
  view?: ViewMode;
}

export interface Props {
  url: string;
  containerId?: string;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  width?: string;
  height?: string;
  page?: string | number;
  id?: string;
  fallbackLink?: string | false;
  pdfOpenParams?: OpenParams;
  PDFJS_URL?: string;
  forcePDFJS: boolean;
  assumptionMode: boolean;
}

export class PDFObject extends React.PureComponent<Props> {
  public static defaultProps = {
    width: '100%',
    height: '100%',
    containerId: 'pdfobject',
    forcePDFJS: false,
    assumptionMode: true,
  };

  public componentDidMount() {
    const { url, containerId, containerProps, ...options } = this.props;

    // for the SSR
    if (pdfobject) {
      pdfobject.embed(url, `#${containerId}`, options);
    }
  }

  public render() {
    return <div {...this.props.containerProps} id={this.props.containerId} />;
  }
}
