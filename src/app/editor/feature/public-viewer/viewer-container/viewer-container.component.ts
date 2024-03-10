import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbSparksService } from '../../../../shared/data-access/db-sparks-service/db-sparks.service';
import { EditorService } from '../../shared/data-access/editor-service/editor.service';
import { EditorComponent } from '../../shared/feature/editor/editor.component';
import { ViewerNavbarComponent } from '../viewer-navbar/viewer-navbar.component';

@Component({
  selector: 'app-viewer-container',
  standalone: true,
  imports: [ViewerNavbarComponent, EditorComponent],
  templateUrl: './viewer-container.component.html',
})
export class ViewerContainerComponent implements OnInit {
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editorService: EditorService,
    private dbSparkService: DbSparksService
  ) {}

  ngOnInit(): void {
    try {
      this.isLoading = true;
      this.route.paramMap.subscribe(async (params) => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/']);
          return;
        }
        const spark = await this.dbSparkService.getPublicSpark(id);
        if (!spark) {
          this.router.navigate(['/']);
          return;
        }
        this.editorService.inputCode.next(structuredClone(spark.code));
        this.editorService.sparkName.next(spark.name);
        this.editorService.sparkId.next(spark.id ?? id ?? null);
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
